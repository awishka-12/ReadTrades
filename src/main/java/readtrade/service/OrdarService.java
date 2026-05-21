package readtrade.service;

import com.google.gson.JsonObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.entity.*;
import readtrade.util.AppUtil;
import readtrade.util.HibernateUtil;
import readtrade.validation.Validator;

import java.util.ArrayList;
import java.util.List;

public class OrdarService {
  public Orders createPendingorder(User user,Session hibernateSession){

      Status pendigStatus=hibernateSession.createNamedQuery("Status.findByValue",Status.class).
              setParameter("value",String.valueOf(Status.Type.PENDING)).getSingleResult();

Orders orders=new Orders();
orders.setUser(user);
orders.setStatus(pendigStatus);


double total=0;

      List<Cart> cartList=hibernateSession.createQuery("FROM Cart c WHERE c.user=:user",Cart.class)
              .setParameter("user",user).getResultList();

      List<Order_Item> orderItemList=new ArrayList<>();
      for (Cart cart:cartList){
         Order_Item item=new Order_Item();
         item.setOrder(orders);
         item.setQuantity(cart.getQty());

         double price=cart.getBook().getPrice();
         item.setPriceAtPurchase(price);

      Stock stock=hibernateSession.createQuery("FROM Stock s WHERE s.book.id=:bid",Stock.class)
              .setParameter("bid",cart.getBook().getId()).getSingleResult();

         item.setStock(stock);

          total+=price*cart.getQty();
        orderItemList.add(item);


    }
      orders.setOrderItems(orderItemList);
      orders.setTotalAmount(total);

      hibernateSession.persist(orders);
      return orders;
  }

public String verifyorderDeatils(String orderId){
    JsonObject responseJson=new JsonObject();
    boolean status=false;
    String message="";

int oid=Integer.parseInt(orderId.replaceAll(Validator.NON_DIGIT_PATTERN,""));
Session hibernateSession= HibernateUtil.getSessionFactory().openSession();
Orders orders=hibernateSession.find(Orders.class, oid);
if(orders==null){
message="Order Not Found";
}else {

    if(orders.getStatus().getName().equals(String.valueOf(Status.Type.COMPLETED))){
status=true;
    }
}
hibernateSession.close();
responseJson.addProperty("status",status);
responseJson.addProperty("message",message);
return AppUtil.GSON.toJson(responseJson);
}

public void compleateOrder(String orderId) {

    int oid = Integer.parseInt(orderId.replaceAll(Validator.NON_DIGIT_PATTERN, ""));

    Transaction transaction = null;
    try (Session hibernateSession = HibernateUtil.getSessionFactory().openSession()) {
        transaction = hibernateSession.beginTransaction();

        try {
            Orders orders = hibernateSession.find(Orders.class, oid);
            if (orders == null) {
                throw new Exception("Order Not Found");
            }
            List<Order_Item> orderItemList = orders.getOrderItems();
            if (orderItemList != null && !orderItemList.isEmpty()) {

                for (Order_Item orderItem : orderItemList) {
                    Stock stock = orderItem.getStock();
                    int updateqty = stock.getStockquantity() - orderItem.getQuantity();
                    if (updateqty < 0) {
                        throw new RuntimeException("Insufficient stock for product: ");
                    }
                    stock.setStockquantity(updateqty);
                    hibernateSession.merge(stock);
                }
            }

            Status complateStuts = hibernateSession.createNamedQuery("Status.findByValue", Status.class).
                    setParameter("value", String.valueOf(Status.Type.COMPLETED))
                    .getSingleResult();
            orders.setStatus(complateStuts);
            hibernateSession.merge(orders);

              List<Cart> cartList=hibernateSession.createQuery("FROM Cart c WHERE c.user=:user",Cart.class).
setParameter("user",orders.getUser()).getResultList();
              for (Cart cart:cartList){
                  hibernateSession.remove(cart);
              }
              transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw new RuntimeException("Failed to complete order: " + e.getMessage(), e);
        }

    }
}

public void failOrder(String orderId) {
    int oid = Integer.parseInt(orderId.replaceAll(Validator.NON_DIGIT_PATTERN, ""));
try (Session hibernateSession = HibernateUtil.getSessionFactory().openSession()) {
        Transaction transaction = hibernateSession.beginTransaction();
    try {
Orders  orders = hibernateSession.find(Orders.class, oid);
if (orders == null) {
throw new Exception("Order Not Found");
}
   Status rejectStus=hibernateSession.createNamedQuery("Status.findByValue",Status.class)
           .setParameter("value",String.valueOf(Status.Type.REJECTED)).getSingleResult();
orders.setStatus(rejectStus);
hibernateSession.merge(orders);
transaction.commit();

    }catch (Exception e){
        transaction.rollback();
    }
}
}

    }
