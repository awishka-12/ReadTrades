package readtrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.dto.*;
import readtrade.entity.*;
import readtrade.util.AppUtil;
import readtrade.util.Env;
import readtrade.util.HibernateUtil;
import readtrade.util.PayHereUtil;
import readtrade.validation.Validator;

import java.net.http.HttpRequest;
import java.util.ArrayList;
import java.util.List;

public class CheckoutService {

    private final OrdarService ordarService=new OrdarService();

    public String processCheckout(CheckoutRequestDTO checkoutRequestDTO, HttpServletRequest request) {

        JsonObject jsonObject = new JsonObject();
        String message = "";
        boolean status = false;

        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
        User sessionUser = (User) request.getSession().getAttribute("user");

        if (sessionUser == null) {
            message = "Session User is null. Please login again.";
        } else {
            // ✅ FIXED: load managed Hibernate entity instead of raw session object
            User dbuser = hibernateSession.find(User.class, sessionUser.getId());
            Transaction transaction = hibernateSession.beginTransaction();
            try {

                if (checkoutRequestDTO.isCurrentAddress()) {
                    // ✅ FIXED: use true not isCurrentAddress(), use getSingleResultOrNull
                    Address address = hibernateSession.createQuery(
                                    "FROM Address a WHERE a.user=:user AND a.isPrimary=:primary", Address.class)
                            .setParameter("user", dbuser)
                            .setParameter("primary", true)
                            .setMaxResults(1)
                            .getSingleResultOrNull();

                    if (address == null) {
                        message = "Primary address not found. Please add an address first.";
                    } else {
                        // ✅ FIXED: was missing PayHereDTO creation and transaction.commit()
                        Orders pendingOrder = ordarService.createPendingorder(dbuser, hibernateSession);
                        PayHereDTO paymetdeatails = createPayHereDTO(hibernateSession, pendingOrder);
                        jsonObject.add("paymetDeatils", AppUtil.GSON.toJsonTree(paymetdeatails));
                        transaction.commit();
                        status = true;
                    }

                } else {
                    // ✅ FIXED: null checks come before .matches() to avoid NullPointerException
                    if (checkoutRequestDTO.getFirstName().isBlank()) {
                        message = "First name is empty.";
                    } else if (checkoutRequestDTO.getLastName().isBlank()) {
                        message = "Last name is empty.";
                    } else if (checkoutRequestDTO.getMobile() == null || !checkoutRequestDTO.getMobile().matches(Validator.MOBILE_VALIDATION)) {
                        message = "Mobile number is invalid.";
                    } else if (checkoutRequestDTO.getPostalCode() == null || !checkoutRequestDTO.getPostalCode().matches(Validator.POSTAL_CODE_VALIDATION)) {
                        message = "Postal code is invalid.";
                    } else if (checkoutRequestDTO.getLineOne().isBlank()) {
                        message = "Address line one is empty.";
                    } else if (checkoutRequestDTO.getLineTwo().isBlank()) {
                        message = "Address line two is empty.";
                    } else {
                        City city = hibernateSession.find(City.class, checkoutRequestDTO.getCityId());
                        if (city == null) {
                            message = "City not found.";
                        } else {
                            // ✅ FIXED: demote existing primary address before creating new one
                            Address existingAddress = hibernateSession.createQuery(
                                            "FROM Address a WHERE a.user=:user AND a.isPrimary=:primary", Address.class)
                                    .setParameter("user", dbuser)
                                    .setParameter("primary", true)
                                    .setMaxResults(1)
                                    .getSingleResultOrNull();

                            if (existingAddress != null) {
                                existingAddress.setPrimary(false);
                                hibernateSession.merge(existingAddress);
                            }

                            Address address = new Address();
                            address.setPrimary(true);
                            address.setLine_one(checkoutRequestDTO.getLineOne());
                            address.setLine_two(checkoutRequestDTO.getLineTwo());
                            address.setPostal_code(checkoutRequestDTO.getPostalCode());
                            address.setMobile(checkoutRequestDTO.getMobile());
                            address.setCity(city);
                            address.setUser(dbuser);

                            hibernateSession.persist(address);

                            Orders pendingOrder = ordarService.createPendingorder(dbuser, hibernateSession);
                            PayHereDTO paymetdeatails = createPayHereDTO(hibernateSession, pendingOrder);
                            jsonObject.add("paymetDeatils", AppUtil.GSON.toJsonTree(paymetdeatails));
                            transaction.commit();
                            status = true;
                        }
                    }
                }

            } catch (Exception e) {
                if (transaction != null) transaction.rollback();
                e.printStackTrace();
            } finally {
                hibernateSession.close();
            }
        }

        jsonObject.addProperty("message", message);
        jsonObject.addProperty("status", status);
        return AppUtil.GSON.toJson(jsonObject);
    }



    private PayHereDTO createPayHereDTO(Session hibernatesession, Orders o) {

        String orderId = "000" + o.getId();

        String retunURL =
                Env.getProperty("app.public.url") + "/api/payments/return";

        String cancelURL =
                Env.getProperty("app.public.url") + "/api/payments/cancel";

        String nitifyURL =
                Env.getProperty("app.public.url") + "/api/payments/notify";

        Orders orders = hibernatesession.find(Orders.class, o.getId());



        User user = hibernatesession.find(
                User.class,
                orders.getUser().getId()
        );

        Address address = hibernatesession.createQuery(
                        "FROM Address a WHERE a.user=:user AND a.isPrimary=:primary",
                        Address.class
                )
                .setParameter("user", user)
                .setParameter("primary", true)
                .setMaxResults(1)
                .getSingleResultOrNull();

        if (address == null) {
            throw new NullPointerException("address is null");
        }


        List<Order_Item> orderItemList = hibernatesession.createQuery(
                        "FROM Order_Item o WHERE o.order.id=:orderId",
                        Order_Item.class
                )
                .setParameter("orderId", orders.getId())
                .getResultList();

        // address
        StringBuilder useradress = new StringBuilder();

        useradress.append(address.getLine_one());

        if (address.getLine_two() != null &&
                !address.getLine_two().isBlank()) {

            useradress.append(", ")
                    .append(address.getLine_two());
        }

        // items
        StringBuilder item = new StringBuilder();

        double total = 0;

        for (Order_Item orderItem : orderItemList) {

            String title =
                    orderItem.getStock().getBook().getTitle();

            item.append(title)
                    .append(" x ")
                    .append(orderItem.getQuantity())
                    .append(", ");

            total += orderItem.getPriceAtPurchase()
                    * orderItem.getQuantity();
        }

        if (item.length() > 2) {
            item.setLength(item.length() - 2);
        }


        String amount = String.format("%.2f", total);



        String hashValue =
                PayHereUtil.generateHash( orderId, amount);


        PayHereDTO payHereDTO = new PayHereDTO();



        payHereDTO.setSandbox(true);
        payHereDTO.setMerchant_id(PayHereUtil.getMerchantId());

        payHereDTO.setReturn_url(retunURL);
        payHereDTO.setCancel_url(cancelURL);
        payHereDTO.setNotify_url(nitifyURL);

        payHereDTO.setOrder_id(orderId);

        payHereDTO.setItems(item.toString());

        payHereDTO.setAmount(amount);

        payHereDTO.setCurrency(PayHereUtil.APP_CURRENCY);

        payHereDTO.setHash(hashValue);
        System.out.println("DTO HASH : " + hashValue);

        payHereDTO.setFirst_name(user.getFirstname());

        payHereDTO.setLast_name(user.getLastname());

        payHereDTO.setEmail(user.getEmail());

        payHereDTO.setPhone(address.getMobile());

        payHereDTO.setAddress(useradress.toString());

        payHereDTO.setCity(address.getCity().getName());

        payHereDTO.setCountry(PayHereUtil.APP_COUNTRY);

        return payHereDTO;
    }


    public String getCheckoutData(HttpServletRequest request) {
        JsonObject responseJson=new JsonObject();
        boolean status= false;
        String message="";
        Session hibernateSession=HibernateUtil.getSessionFactory().openSession();

        User sessionuser=(User) request.getSession().getAttribute("user");
        if (sessionuser==null) {
            message="Session User is null.please login again";
        }else  {


Address primaryaddrees=hibernateSession.createQuery("FROM Address a WHERE " +
        "a.user=:user AND isPrimary=:primary",Address.class)
        .setParameter("user",sessionuser)
        .setParameter("primary",true)
        .setMaxResults(1)
        .getSingleResultOrNull();

if (primaryaddrees == null) {
    message="Address is null.please login again";
}else {
    AddressDTO addressDTO=getAddressDTO(primaryaddrees);


      List<Cart> cartList=hibernateSession.createQuery("FROM Cart c WHERE c.user.id=:userId",Cart.class).
           setParameter("userId",sessionuser.getId())
           .getResultList();
      if (cartList.size()==0) {
          message="Cart is empty please login again";
      }else {

          cartService cartService=new cartService();
          List<ProductDTO> cartDTOList=cartService.getCartListOnly(sessionuser.getId());


    List<DeliveryTypeDTO> deliveryTypeDTOS=new ArrayList<>();
List<Delivery_Type> deliveryType=hibernateSession.createQuery("FROM Delivery_Type d",Delivery_Type.class)
        .getResultList();
for (Delivery_Type delivery_type : deliveryType) {
    DeliveryTypeDTO deliveryTypeDTO=new DeliveryTypeDTO();
    deliveryTypeDTO.setId(delivery_type.getId());
    deliveryTypeDTO.setType(delivery_type.getType());
    deliveryTypeDTO.setPrice(delivery_type.getPrice());
    deliveryTypeDTOS.add(deliveryTypeDTO);

}
status=true;
responseJson.addProperty("message",message);
responseJson.addProperty("status",status);

responseJson.add("userPrimaryAddress",AppUtil.GSON.toJsonTree(addressDTO));
responseJson.add("userCart",AppUtil.GSON.toJsonTree(cartDTOList));
responseJson.add("userDeliveryType",AppUtil.GSON.toJsonTree(deliveryTypeDTOS));

responseJson.addProperty("message",message);
responseJson.addProperty("status",status);

               }
           }
            hibernateSession.close();
        }

          responseJson.addProperty("message",message);
          responseJson.addProperty("status",status);
          return AppUtil.GSON.toJson(responseJson);
    }



private AddressDTO getAddressDTO(Address address) {
AddressDTO addressDTO=new AddressDTO();
addressDTO.setId(address.getId());
addressDTO.setFirstname(address.getUser().getFirstname());
addressDTO.setLastname(address.getUser().getLastname());
addressDTO.setMobile(address.getMobile());
addressDTO.setPostcode(address.getPostal_code());
addressDTO.setLine_one(address.getLine_one());
addressDTO.setLine_two(address.getLine_two());
addressDTO.setCity(address.getCity().getName());
return addressDTO;
}


public List<CartDTO> getCartList(List<Cart> cartList) {
List<CartDTO> cartDTOS=new ArrayList<>();
for (Cart cart : cartList) {
    CartDTO cartDTO=new CartDTO();
    cartDTO.setId(cart.getId());
    cartDTO.setQty(cart.getQty());
    cartDTO.setUserid(cart.getUser().getId());
    cartDTO.setStockId(cart.getBook().getId().intValue());
cartDTOS.add(cartDTO);
}
return cartDTOS;
}



}

