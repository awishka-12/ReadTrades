package readtrade.service;

import com.google.gson.JsonObject;
import jakarta.ws.rs.core.Response;
import org.hibernate.Session;
import readtrade.entity.Author;
import readtrade.entity.Catagory;
import readtrade.entity.Language;
import readtrade.entity.Printyear;
import readtrade.util.AppUtil;
import readtrade.util.HibernateUtil;

import java.util.List;

public class ProductContentService {

    public String loadyear(){
        JsonObject responseObject=new JsonObject();
        Session session=HibernateUtil.getSessionFactory().openSession();
        List<Printyear> printyearList=session.createQuery("FROM Printyear printyear",Printyear.class)
                .getResultList();

        responseObject.add("year",AppUtil.GSON.toJsonTree(printyearList));
        session.close();
        return AppUtil.GSON.toJson(responseObject);
    }

    public String loadlanguages(){
        JsonObject responseObject= new JsonObject();
        Session hibernatesession = HibernateUtil.getSessionFactory().openSession();
        List<Language>languageList=hibernatesession.createQuery("FROM Language language",Language.class)
                .getResultList();

        responseObject.add("language",AppUtil.GSON.toJsonTree(languageList));
        hibernatesession.close();
        return AppUtil.GSON.toJson(responseObject);
    }

    public String loadCategory() {
        JsonObject responseObject = new JsonObject();
        Session hibernatesession = HibernateUtil.getSessionFactory().openSession();
        List<Catagory> categoryList = hibernatesession.createQuery("FROM Catagory catagory",Catagory.class)
                .getResultList();

        responseObject.add("category",AppUtil.GSON.toJsonTree(categoryList));
        hibernatesession.close();
        return AppUtil.GSON.toJson(responseObject);
    }

    public String loadAuthor(){
        JsonObject responseObject = new JsonObject();
        Session hibernatesession = HibernateUtil.getSessionFactory().openSession();
        List<Author> authorList=hibernatesession.createQuery("FROM Author author",Author.class)
                .getResultList();

        responseObject.add("author", AppUtil.GSON.toJsonTree(authorList));

        hibernatesession.close();
        return AppUtil.GSON.toJson(responseObject);
    }
}
