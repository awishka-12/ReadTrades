package readtrade.service;

import com.google.gson.JsonObject;
import org.hibernate.Session;
import readtrade.dto.InvoiceDTO;
import readtrade.entity.Address;
import readtrade.entity.Order_Item;
import readtrade.entity.Orders;
import readtrade.entity.User;
import readtrade.util.AppUtil;
import readtrade.util.HibernateUtil;
import readtrade.validation.Validator;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class InvoiceService {

    public String getInvoice(String orderId) {
        JsonObject responseJson = new JsonObject();
        boolean status = false;
        String message = "";

        if (orderId == null || orderId.isEmpty()) {
            message = "Order ID is required";
            responseJson.addProperty("status", status);
            responseJson.addProperty("message", message);
            return AppUtil.GSON.toJson(responseJson);
        }

        int oid = Integer.parseInt(orderId.replaceAll(Validator.NON_DIGIT_PATTERN, ""));
        Session hibernateSession = HibernateUtil.getSessionFactory().openSession();

        try {
            Orders orders = hibernateSession.find(Orders.class, oid);
            if (orders == null) {
                message = "Order not found";
            } else {
                InvoiceDTO invoiceDTO = new InvoiceDTO();

                // Invoice info
                invoiceDTO.setInvoiceNo("INV-" + String.format("%06d", orders.getId()));
                invoiceDTO.setDate(orders.getCreatedAt()
                        .format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")));
                invoiceDTO.setStatus(orders.getStatus().getName());

                // Buyer info
                User user = orders.getUser();
                invoiceDTO.setBuyerName(user.getFirstname() + " " + user.getLastname());
                invoiceDTO.setBuyerEmail(user.getEmail());

                // Address
                Address address = hibernateSession.createQuery(
                                "FROM Address a WHERE a.user=:user AND a.isPrimary=:primary", Address.class)
                        .setParameter("user", user)
                        .setParameter("primary", true)
                        .setMaxResults(1)
                        .getSingleResultOrNull();

                if (address != null) {
                    invoiceDTO.setBuyerPhone(address.getMobile());
                    invoiceDTO.setBuyerAddress(address.getLine_one() +
                            (address.getLine_two() != null ? ", " + address.getLine_two() : ""));
                    invoiceDTO.setBuyerCity(address.getCity().getName());
                }

                // Order items
                List<Order_Item> orderItems = hibernateSession.createQuery(
                                "FROM Order_Item o WHERE o.order.id=:orderId", Order_Item.class)
                        .setParameter("orderId", orders.getId())
                        .getResultList();

                List<InvoiceDTO.InvoiceItemDTO> itemDTOS = new ArrayList<>();
                double subtotal = 0;

                for (Order_Item orderItem : orderItems) {
                    InvoiceDTO.InvoiceItemDTO itemDTO = new InvoiceDTO.InvoiceItemDTO();
                    itemDTO.setTitle(orderItem.getStock().getBook().getTitle());
                    itemDTO.setCategory(orderItem.getStock().getBook().getCatagory().getName());
                    itemDTO.setQuantity(orderItem.getQuantity());
                    itemDTO.setUnitPrice(orderItem.getPriceAtPurchase());
                    itemDTO.setTotal(orderItem.getPriceAtPurchase() * orderItem.getQuantity());
                    subtotal += itemDTO.getTotal();
                    itemDTOS.add(itemDTO);
                }

                invoiceDTO.setItems(itemDTOS);
                invoiceDTO.setSubtotal(subtotal);
                invoiceDTO.setShipping(200.00); // default shipping
                invoiceDTO.setTotal(subtotal + 200.00);

                status = true;
                responseJson.add("invoice", AppUtil.GSON.toJsonTree(invoiceDTO));
            }
        } finally {
            hibernateSession.close();
        }

        responseJson.addProperty("status", status);
        responseJson.addProperty("message", message);
        return AppUtil.GSON.toJson(responseJson);
    }
}
