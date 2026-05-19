package readtrade.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.hibernate.Session;
import org.hibernate.query.Query;
import readtrade.entity.Book;
import readtrade.util.HibernateUtil;

import java.util.List;

public class IndexService {

    public String loadIndexProduct(String search,int categoryid,int page,int size){
        JsonObject responsejson=new JsonObject();
        JsonArray array=new JsonArray();

        Session hibernateSession= HibernateUtil.getSessionFactory().openSession();
        try {

            String hql = "FROM Book b WHERE 1=1 ";

            // SEARCH
            if (search != null && !search.trim().isEmpty()) {
                hql += " AND (LOWER(b.title) LIKE :search OR LOWER(b.author.name) LIKE :search) ";
            }

            // CATEGORY
            if (categoryid > 0) {
                hql += "AND b.catagory.id = :categoryid ";
            }

            Query<Book> query = hibernateSession.createQuery(hql, Book.class);

            if (search != null && !search.trim().isEmpty()) {
                query.setParameter("search", "%" + search.toLowerCase() + "%");
            }

            if (categoryid > 0) {
                query.setParameter("categoryid", categoryid);
            }

            int start=(page-1)*size;
            query.setFirstResult(start);
            query.setMaxResults(size);

            List<Book> books = query.list();

            for (Book book : books) {

                JsonObject obj = new JsonObject();
                obj.addProperty("bookId", book.getId());
                obj.addProperty("title", book.getTitle());
                obj.addProperty("author", book.getAuthor().getName());
                obj.addProperty("price", book.getPrice());
                obj.addProperty("category", book.getCatagory().getName());



                if (book.getImages() != null && !book.getImages().isEmpty()) {
                    String rawImage = book.getImages().get(0);

                    String filename = rawImage.substring(rawImage.lastIndexOf("/") + 1);
                    filename = filename.substring(filename.lastIndexOf("/") + 1);

                    obj.addProperty("image", filename);
                }else {
                    obj.addProperty("images", "default.jpg");
                }



                array.add(obj);
            }
            String countHql = "SELECT COUNT(b.id) " + hql;

            Query<Long> countQuery = hibernateSession.createQuery(countHql, Long.class);


            if(search != null && !search.trim().isEmpty()){
                countQuery.setParameter("search", "%" + search.toLowerCase() + "%");
            }

            if(categoryid > 0){
                countQuery.setParameter("categoryid", categoryid);
            }

            Long total=countQuery.uniqueResult();

            responsejson.addProperty("status", true);
            responsejson.add("data", array);
            responsejson.addProperty("total", total);

        }catch(Exception e){
            e.printStackTrace();
            responsejson.addProperty("status", false);
            responsejson.addProperty("message", "Search failed");
        }finally {
            hibernateSession.close();
        }
        return responsejson.toString();
    }

}
