package readtrade.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.dto.ProductDTO;
import readtrade.entity.Book;
import readtrade.entity.Cart;
import readtrade.entity.User;
import readtrade.util.HibernateUtil;

import java.util.ArrayList;
import java.util.List;

public class cartService {

    public String deleteItem(String id) {
        JsonObject response = new JsonObject();

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        try {

            Cart cart = session.get(Cart.class, Integer.parseInt(id));
            if(cart != null){
                session.remove(cart);
            }
            transaction.commit();
            session.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            session.close();
        }
        return response.toString();
    }

    public String updateQty(String id,String qty,@Context HttpServletRequest request){
        JsonObject res = new JsonObject();

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        try {

            int carid=Integer.parseInt(id);
            int newQty=Integer.parseInt(qty);

            Cart cart=(Cart)session.get(Cart.class,carid);
            if(cart==null){
                res.addProperty("status",false);
                res.addProperty("error","Cart not found");
                return res.toString();
            }
            Book book=cart.getBook();
            if(newQty>book.getQuantity()){
                res.addProperty("status",false);
                res.addProperty("error","Book quantity exceeded");
                return res.toString();
            }

            cart.setQty(newQty);
            session.update(cart);
            transaction.commit();

            res.addProperty("status", true);   // ← was missing
            res.addProperty("message", "Quantity updated");
        } catch (Exception e) {
            e.printStackTrace();
            if (transaction != null) transaction.rollback();
            res.addProperty("status", false);
            res.addProperty("message", "Error: " + e.getMessage());

        }finally{
            session.close();
        }
  return res.toString();
    }

    public String getcart(@Context HttpServletRequest request) {
        JsonObject jsonObject = new JsonObject();

        Session session = HibernateUtil.getSessionFactory().openSession();

        HttpSession httpSession = request.getSession();
        User user = (User) httpSession.getAttribute("user");

        List<Cart> cartList = session.createQuery(
                        "SELECT c FROM Cart c " +
                                "JOIN FETCH c.book b " +
                                "JOIN FETCH b.author " +
                                "WHERE c.user.id = :uid", Cart.class)
                .setParameter("uid", user.getId())
                .getResultList();

        List<ProductDTO> productDTOList=new ArrayList<>();
        for (Cart cart : cartList) {
            ProductDTO dto=new ProductDTO();
            dto.setProductid(cart.getId());
            dto.setQuantity(cart.getQty());
            dto.setTitle(cart.getBook().getTitle());
            dto.setPrice(cart.getBook().getPrice());
            dto.setName(cart.getBook().getAuthor().getName());
            dto.setImages(cart.getBook().getImages());
           productDTOList.add(dto);

        }
        jsonObject.addProperty("status",true);
        jsonObject.add("data",new Gson().toJsonTree(productDTOList));
        session.close();

        return jsonObject.toString();
    }

    public String addToCart(String bid, HttpServletRequest request) {

        JsonObject res = new JsonObject();

        // 1. Check session first — before opening Hibernate session
        HttpSession httpSession = request.getSession(false);

        User sessionUser = (User) httpSession.getAttribute("user");

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        int bookId = Integer.parseInt(bid);

        if(sessionUser==null){
            List<Cart> sessionCart=(List<Cart>) httpSession.getAttribute("sessioncart");
            if(sessionCart==null){
                sessionCart=new ArrayList<>();
            }
            boolean status=false;
            for(Cart c:sessionCart){
                if(c.getBook().getId()==bookId){
             c.setQty(c.getQty()+1);
             status=true;
             break;
                }

            }

            if(!status){
                Session session1=HibernateUtil.getSessionFactory().openSession();
                Book book=(Book)session1.get(Book.class,bookId);
                session1.close();

                Cart cart=new Cart();
                cart.setBook(book);
                cart.setQty(1);

                sessionCart.add(cart);
            }
            httpSession.setAttribute("sessioncart",sessionCart);
            res.addProperty("status",true);
            res.addProperty("message", "added to session cart");
            return res.toString();
        }

        try {



            User user = session.get(User.class, sessionUser.getId());
            Book book = session.get(Book.class, (long) bookId);


            if (user == null) {
                res.addProperty("status", false);
                res.addProperty("message", "User not found");
                return res.toString();
            }
            if (book == null) {
                res.addProperty("status", false);
                res.addProperty("message", "Book not found");
                return res.toString();
            }

            Cart existing = session.createQuery(
                            "FROM Cart WHERE user.id=:uid AND book.id=:bid", Cart.class)
                    .setParameter("uid", user.getId())
                    .setParameter("bid", (long) bookId)
                    .uniqueResult();

         if(existing != null) {

             int NewQty=existing.getQty()+1;
             int bookqty=book.getQuantity();

             System.out.println("book quentity"+bookqty);

             if(NewQty > bookqty) {
                 res.addProperty("status", false);
                 res.addProperty("message", "Book already exists");
                 session.getTransaction().commit();
                 return res.toString();
             }
             existing.setQty(NewQty);
             session.update(existing);
             res.addProperty("status", true);
             res.addProperty("message", " more one  Book added");
         }else {
if(book.getQuantity()<1) {
res.addProperty("status", false);
res.addProperty("message", "Book already exists");
session.getTransaction().commit();
return res.toString();
}

   Cart cart=new Cart();
cart.setQty(1);
cart.setUser(user);
cart.setBook(book);
session.save(cart);

         }
            tx.commit();
            res.addProperty("status", true);
            res.addProperty("message", "Added to cart");

        } catch (Exception e) {
            e.printStackTrace();
            if (tx != null) tx.rollback();
            res.addProperty("status", false);
            res.addProperty("message", "Error: " + e.getMessage());
        } finally {
            session.close();
        }

        return res.toString();
    }

    public void mergeSessionCart(HttpServletRequest request) {

        HttpSession httpSession = request.getSession(false);
        User sessionUser = (User) httpSession.getAttribute("user");

        List<Cart> sessionCart=(List<Cart>) httpSession.getAttribute("sessioncart");
        if(sessionUser==null ||  sessionCart==null)return;

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        try {
            User user = (User) session.get(User.class, sessionUser.getId());
            for(Cart cart:sessionCart){
                Cart existing = session.createQuery(
                        "FROM Cart WHERE user.id=:uid AND book.id=:bid",Cart.class)
                        .setParameter("uid",user.getId())
                        .setParameter("bid",cart.getBook().getId())
                        .uniqueResult();

                if(existing != null) {
                    existing.setQty(existing.getQty()+cart.getQty());
                    session.update(existing);
                }else {
                    Cart newCart=new Cart();
                    newCart.setUser(user);
                    newCart.setBook(session.get(Book.class, cart.getBook().getId()));
                    newCart.setQty(cart.getQty());
                    session.save(newCart);
                }
                tx.commit();
                httpSession.removeAttribute("sessioncart");
            }
        }catch (Exception e){
            tx.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }


    }


    public List<ProductDTO> getCartListOnly(int userId) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        List<Cart> cartList = session.createQuery(
                        "SELECT c FROM Cart c " +
                                "JOIN FETCH c.book b " +
                                "JOIN FETCH b.author " +
                                "WHERE c.user.id = :uid", Cart.class)
                .setParameter("uid", userId)
                .getResultList();

        List<ProductDTO> list = new ArrayList<>();

        for (Cart cart : cartList) {
            ProductDTO dto = new ProductDTO();

            dto.setProductid(cart.getId());
            dto.setQuantity(cart.getQty());
            dto.setTitle(cart.getBook().getTitle());
            dto.setPrice(cart.getBook().getPrice());
            dto.setName(cart.getBook().getAuthor().getName());

            list.add(dto);
        }

        session.close();
        return list;
    }
}
