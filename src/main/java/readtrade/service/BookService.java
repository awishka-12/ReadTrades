package readtrade.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.Context;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.dto.ProductDTO;
import readtrade.entity.*;
import readtrade.util.HibernateUtil;

public class BookService {

    public String addNewLanguage(@Context HttpServletRequest request, ProductDTO productDTO) {

        JsonObject jsonObject = new JsonObject();
        boolean status=false;
        String message="";

        try {
            HttpSession session = request.getSession(false);
            if(session.getAttribute("user")==null){
                message ="please login first!";
            } else if (productDTO.getLanguage()==null|| productDTO.getLanguage().trim().isEmpty()) {
                message ="please input Language!";
            }else {
                Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
                Transaction transaction = hibernateSession.beginTransaction();

                Language existinglanguage = hibernateSession
                        .createQuery("FROM Language WHERE language = :language", Language.class)
                        .setParameter("language", productDTO.getLanguage().trim())
                        .uniqueResult();

                if(existinglanguage !=null){
                    message = "This year already exists!";
                }else {
                    Language newLanguage = new Language();
                    newLanguage.setLanguage(productDTO.getLanguage().trim());

                    hibernateSession.persist(newLanguage);
                    transaction.commit();
                    hibernateSession.close();

                    status=true;
                    message="language add successfully!";
                }

            }
        }catch (Exception e){
       e.printStackTrace();
       message="year add failed!";
        }
        jsonObject.addProperty("status",status);
        jsonObject.addProperty("message",message);
        return jsonObject.toString();
    }

    public String addNewCategory( @Context HttpServletRequest request ,ProductDTO productDTO) {
        JsonObject jsonObject=new JsonObject();
        boolean status=false;
        String message="";

        try {

            HttpSession session=request.getSession(false);
            if(session.getAttribute("user")==null){
                message ="please login again";
            } else if (productDTO.getCategory()==null || productDTO.getCategory().trim().isEmpty()) {
                message ="please add category";
            }else {
                Session hibernatesession=HibernateUtil.getSessionFactory().openSession();
                Transaction transaction=hibernatesession.beginTransaction();


                Catagory categoryexist = hibernatesession
                        .createQuery("FROM Catagory WHERE name = :name", Catagory.class)
                        .setParameter("name", productDTO.getCategory().trim())
                        .uniqueResult();

                if(categoryexist !=null){
                    message="This Category already exists!";
                }else {
                    Catagory catagory=new Catagory();
                    catagory.setName(productDTO.getCategory());

                    hibernatesession.persist(catagory);
                    transaction.commit();
                    hibernatesession.close();

                    status=true;
                    message="category added successfully";
                }



            }
        }catch (Exception e){
            message = "category saving failed";
            e.printStackTrace();
        }

        jsonObject.addProperty("message",message);
        jsonObject.addProperty("status",status);
        return jsonObject.toString();
    }

    public String addNewAuther(@Context HttpServletRequest request, ProductDTO productDTO) {

        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        try {
            HttpSession session=request.getSession(false);
            if(session==null || session.getAttribute("user")==null){
                message="Please login again";
            } else if (productDTO.getName()==null|| productDTO.getName().trim().isEmpty()) {
                message="new Authorname cannot be empty";
            } else if (productDTO.getBio()==null|| productDTO.getBio().trim().isEmpty()) {
                message="new AuthorBio cannot be empty";
            }else {
                Session hibernatesession= HibernateUtil.getSessionFactory().openSession();
                Transaction transaction1=hibernatesession.beginTransaction();

                Author existingAuthor = hibernatesession
                        .createQuery("FROM Author WHERE name = :name", Author.class)
                        .setParameter("name", productDTO.getName().trim())
                        .uniqueResult();


                if(existingAuthor !=null){
                    message="author already exists";

                }else {
                    Author author=new Author();
                    author.setName(productDTO.getName());
                    author.setBio(productDTO.getBio());

                    hibernatesession.persist(author);

                    transaction1.commit();
                    hibernatesession.close();

                    status=true;
                    message = "Author saved successfully";
                }

            }


        }catch (Exception e){
            message = "Author saving failed";
            e.printStackTrace();
        }
        responseObject.addProperty("message", message);
        responseObject.addProperty("status", status);
        return responseObject.toString();
    }


}
