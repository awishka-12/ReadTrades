package readtrade.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.Context;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.dto.ProductDTO;
import readtrade.entity.*;
import readtrade.util.HibernateUtil;

import org.hibernate.query.Query;
import java.util.List;

public class ProdcutService {

public String getAllproducts(int page,int size,int category, int author,int year){
    JsonObject response = new JsonObject();
    JsonArray jsonArray = new JsonArray();

    Session session = HibernateUtil.getSessionFactory().openSession();
    try {

        if (page < 0) page = 0;
        if (size <= 0) size = 5;

        String hql = "FROM Book b WHERE 1=1";

        if (category < 0) {
            hql += " AND b.Catagory.id=:cat_id";
        }
        if (author < 0) {
            hql += " AND b.Author.id=:author_id";
        }
        if (year < 0) {
            hql += " AND b.Year.id=:year_id";
        }
        Query<Book> query = session.createQuery(hql, Book.class);

        if (category > 0) query.setParameter("cat_id", category);
        if (author > 0) query.setParameter("author_id", author);
        if (year > 0) query.setParameter("year_id", year);

int offset = page * size;
query.setFirstResult(offset);
query.setMaxResults(size);

List<Book> books = query.list();

     Query<Long> countQuery=session.createQuery("SELECT COUNT (b.id)"+hql,long.class);


        if (category > 0) query.setParameter("cat_id", category);
        if (author > 0) query.setParameter("author_id", author);
        if (year > 0) query.setParameter("year_id", year);

        Long total=countQuery.uniqueResult();

        for (Book book : books) {
            JsonObject obj= new JsonObject();
            obj.addProperty("bookId", book.getId());
            obj.addProperty("author",book.getAuthor().getName());
            obj.addProperty("category",book.getCatagory().getName());
            obj.addProperty("isb_number",book.getIsb_number());
            obj.addProperty("price",book.getPrice());
            obj.addProperty("title",book.getTitle());
            obj.addProperty("quantity",book.getQuantity());
            obj.addProperty("year",book.getPrintyear().getYear());
            obj.addProperty("language",book.getLanguage().getLanguage());

            jsonArray.add(obj);


        }

        response.addProperty("status", true);
        response.add("data", jsonArray);
        response.addProperty("total", total);
        response.addProperty("page", page);
        response.addProperty("size", size);
    } catch (Exception e) {
        response.addProperty("status", false);
        response.addProperty("message", "Error loading products");
        e.printStackTrace();
    }finally {
        session.close();
    }
    return response.toString();
}

    public String addNewProduct(ProductDTO productDTO, @Context HttpServletRequest request) {

        JsonObject jsonObject = new JsonObject();
        boolean status = false;
        String message = "";
        Long productId = null;

        // ✅ VALIDATION
        if (productDTO.getAuthorid() <= 0) {
            message = "Product author is empty";

        } else if (productDTO.getPrintYearid() <= 0) {
            message = "Product print year is empty";

        } else if (productDTO.getCategoryid() <= 0) {
            message = "Product category is empty";

        } else if (productDTO.getLanguageid() <= 0) {
            message = "Product language is empty";

        } else if (productDTO.getPrice() == null) {
            message = "Product price is empty";

        } else if (productDTO.getTitle() == null || productDTO.getTitle().isEmpty()) {
            message = "Product title is empty";

        } else if (productDTO.getIsb_number() == null || productDTO.getIsb_number().isEmpty()) {
            message = "Product ISBN is empty";

        } else if (productDTO.getDescription() == null || productDTO.getDescription().isEmpty()) {
            message = "Product description is empty";

        } else if (productDTO.getQuantity() <= 0) {
            message = "Product quantity is empty";

        } else {

            HttpSession httpSession = request.getSession(false);

            if (httpSession == null || httpSession.getAttribute("user") == null) {
                message = "You are not logged in";

            } else {

                Session session = HibernateUtil.getSessionFactory().openSession();
                Transaction transaction = null;

                try {
                    transaction = session.beginTransaction();

                    Author author = session.get(Author.class, productDTO.getAuthorid());
                    Catagory catagory = session.get(Catagory.class, productDTO.getCategoryid());
                    Printyear printyear = session.get(Printyear.class, productDTO.getPrintYearid());
                    Language language = session.get(Language.class, productDTO.getLanguageid());

                    Book book;

                    // ✅ UPDATE
                    if (productDTO.getProductid() > 0) {

                        book = session.get(Book.class, productDTO.getProductid());

                        if (book == null) {
                            message = "Product not found";

                        } else {

                            book.setTitle(productDTO.getTitle());
                            book.setDiscription(productDTO.getDescription());
                            book.setIsb_number(productDTO.getIsb_number());
                            book.setPrice(productDTO.getPrice());
                            book.setQuantity(productDTO.getQuantity());

                            book.setAuthor(author);
                            book.setCatagory(catagory);
                            book.setPrintyear(printyear);
                            book.setLanguage(language);

                            session.merge(book);

                            status = true;
                            message = "Product updated successfully";
                            productId = book.getId();
                        }

                    } else {

                        // ✅ CREATE
                        book = new Book();

                        book.setTitle(productDTO.getTitle());
                        book.setDiscription(productDTO.getDescription());
                        book.setIsb_number(productDTO.getIsb_number());
                        book.setPrice(productDTO.getPrice());
                        book.setQuantity(productDTO.getQuantity());

                        book.setAuthor(author);
                        book.setCatagory(catagory);
                        book.setPrintyear(printyear);
                        book.setLanguage(language);

                        session.persist(book);

                        Stock stock= new Stock();
                        stock.setBook(book);
                        stock.setStockquantity(productDTO.getQuantity());
                        stock.setPrice(productDTO.getPrice());
                        session.persist(stock);

                        status = true;
                        message = "Product successfully added";
                        productId = book.getId();
                    }

                    transaction.commit();

                } catch (Exception e) {

                    if (transaction != null) {
                        transaction.rollback();
                    }

                    message = "Something went wrong";
                    e.printStackTrace();

                } finally {
                    session.close();
                }
            }
        }

        // ✅ FINAL RESPONSE (ALWAYS RETURN)
        jsonObject.addProperty("status", status);
        jsonObject.addProperty("message", message);

        if (productId != null) {
            jsonObject.addProperty("productid", productId);
        }

        return jsonObject.toString();
    }


    public boolean updateProductImage(int productId, String imageUrl){
        boolean status=false;
        Session session= HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();
            Book book=session.get(Book.class,productId);
            if (book != null) {
                book.getImages().add(imageUrl);
                session.merge(book);
                transaction.commit();
                status=true;
            }

        }catch (Exception e){
            if (transaction != null) transaction.rollback();
            e.printStackTrace();
        }finally {
            session.close();
        }
        return status;
    }
}
