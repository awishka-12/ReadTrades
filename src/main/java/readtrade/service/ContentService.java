package readtrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.Context;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.dto.UserDTO;
import readtrade.entity.Address;
import readtrade.entity.City;
import readtrade.entity.User;
import readtrade.util.AppUtil;
import readtrade.util.HibernateUtil;
import readtrade.validation.Validator;

import java.util.List;

public class ContentService {

public String SaveAddress(UserDTO userDTO,@Context HttpServletRequest request){

    JsonObject jsonObject= new JsonObject();
    boolean status=false;
    String message="";


if(userDTO.getLineone()==null || userDTO.getLineone().trim().isEmpty()){
    message="Please enter a line one";
} else if (userDTO.getLinetwo()== null || userDTO.getLinetwo().trim().isEmpty()) {
    message="Please enter a line two";
} else if (userDTO.getMobile() == null || userDTO.getMobile().trim().isEmpty()) {
    message="Please enter a mobile number";
} else if (!userDTO.getPostalCode().matches(Validator.POSTAL_CODE_VALIDATION)) {
    message="Please enter a valid postal code";
} else if (userDTO.getCityId() == 0) {
    message="Please enter a city ";
}else {

HttpSession httpsession = request.getSession(false);
if (httpsession==null) {
    message="please login first";
} else if (httpsession.getAttribute("user")==null) {
    message="please login first";
}else {

    Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
User sessionuser = (User) httpsession.getAttribute("user");


Transaction transaction= hibernateSession.beginTransaction();

try {

    City city=hibernateSession.get(City.class, userDTO.getCityId());
    User dbuser=hibernateSession.get(User.class,sessionuser.getId());


    if(city==null){
      message="city not found";
  }else {

     List<Address> addressList=hibernateSession.createQuery
                     ("FROM Address a WHERE a.user=:user",Address.class)
             .setParameter("user",dbuser)
             .getResultList();

     Address address;

      if(addressList.isEmpty()){
          address=new Address();
          address.setUser(dbuser);
          address.setPrimary(true);

      }else {

      address=addressList.get(0);
      }
        address.setUser(dbuser);

      address.setLine_one(userDTO.getLineone());
      address.setLine_two(userDTO.getLinetwo());
      address.setMobile(userDTO.getMobile());
      address.setPostal_code(userDTO.getPostalCode());
      address.setCity(city);



      if(address.getId()== 0){
          hibernateSession.persist(address);
          message="Address saved successfully";
      }else {
          hibernateSession.merge(address);
          message="Address update successfully";
      }
      transaction.commit();

      status=true;


  }


 }catch (Exception e){
      e.printStackTrace();
    if(transaction!=null){
        transaction.rollback();
        message=e.getMessage();
    }
}finally {
    hibernateSession.close();
}

}
}
jsonObject.addProperty("status",status);
jsonObject.addProperty("message",message);
return jsonObject.toString();
}



    public String updateuser(UserDTO userDTO, HttpServletRequest request) {

        JsonObject responseJson = new JsonObject();
        boolean status = false;
        String message;

        // Validation
        if (userDTO.getFirstName() == null || userDTO.getFirstName().trim().isEmpty()) {
            message = "First Name is required";
        } else if (userDTO.getLastName() == null || userDTO.getLastName().trim().isEmpty()) {
            message = "Last Name is required";
        } else {

            HttpSession httpSession = request.getSession(false);

            if (httpSession == null || httpSession.getAttribute("user") == null) {
                message = "Please login first";
            } else {

                User sessionUser = (User) httpSession.getAttribute("user");

                Session hibernateSession = null;
                Transaction tx = null;

                try {
                    hibernateSession = HibernateUtil.getSessionFactory().openSession();
                    tx = hibernateSession.beginTransaction();

                    User dbUser = hibernateSession
                            .createNamedQuery("User.getEmail", User.class)
                            .setParameter("email", sessionUser.getEmail())
                            .getSingleResult();

                    dbUser.setFirstname(userDTO.getFirstName());
                    dbUser.setLastname(userDTO.getLastName());

                    tx.commit();

                    status = true;
                    message = "Name updated successfully";

                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    message = "Error updating name";
                    e.printStackTrace();
                } finally {
                    if (hibernateSession != null)
                        hibernateSession.close();
                }
            }
        }

        responseJson.addProperty("status", status);
        responseJson.addProperty("message", message);

        return AppUtil.GSON.toJson(responseJson);
    }



public String loadAddress(){
    JsonObject responseObject = new JsonObject();
    Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
    List<City> cityList = hibernateSession.createQuery("FROM City c",City.class).getResultList();


responseObject.add("city", AppUtil.GSON.toJsonTree(cityList));

hibernateSession.close();
return AppUtil.GSON.toJson(responseObject);
}
}
