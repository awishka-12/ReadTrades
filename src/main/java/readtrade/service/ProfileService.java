package readtrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.Context;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.dto.UserDTO;
import readtrade.entity.Address;
import readtrade.entity.User;
import readtrade.util.HibernateUtil;
import readtrade.validation.Validator;

import java.util.List;

public class ProfileService {

    public String updatePassword(@Context HttpServletRequest request, UserDTO userDTO) {

        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        HttpSession session = request.getSession(false);

        // 1. session check
        if (session == null || session.getAttribute("user") == null) {
            message = "Please login again";

            // 2. validations
        } else if (userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
            message = "Current password is empty";

        } else if (userDTO.getNewPassword() == null || userDTO.getNewPassword().trim().isEmpty()) {
            message = "New password is empty";

        } else if (userDTO.getConfirmPassword() == null || userDTO.getConfirmPassword().trim().isEmpty()) {
            message = "Confirm password is empty";

        } else if (!userDTO.getNewPassword().equals(userDTO.getConfirmPassword())) {
            message = "New password and confirm password do not match";

        } else if (!userDTO.getNewPassword().matches(Validator.PASSWORD_VALIDATION)) {
            message = "New password not valid";

        } else {

            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            Transaction transaction = hibernateSession.beginTransaction();

            try {
                User sessionUser = (User) session.getAttribute("user");
                User dbUser = hibernateSession.get(User.class, sessionUser.getId());

                // 3. current password check
                if (!dbUser.getPassword().equals(userDTO.getPassword())) {
                    message = "Current password is incorrect";

                } else {
                    // 4. update password
                    dbUser.setPassword(userDTO.getNewPassword());
                    hibernateSession.merge(dbUser);

                    transaction.commit();
                    status = true;
                    message = "Password updated successfully";
                }

            } catch (Exception e) {
                transaction.rollback();
                message = "Password update failed";

            } finally {
                hibernateSession.close();
            }
        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return responseObject.toString();
    }



//public String Addressdata(@Context HttpServletRequest request){
//    JsonObject responseObject = new JsonObject();
//    HttpSession httpsession = request.getSession(false);
//
//    boolean status=false;
//    String message="";
//
//    Session hibernamtesession= HibernateUtil.getSessionFactory().openSession();
//
//    User user = (User)httpsession.getAttribute("user");
//    User sessionuser = (User)httpsession.getAttribute("user");
//
//    Transaction transaction = hibernamtesession.beginTransaction();
//    try {
//
//        User dbuser=hibernamtesession.get(User.class,sessionuser.getId());
//
//        List<Address> addressList=hibernamtesession.createQuery
//                        ("FROM Address a WHERE a.user=:user",Address.class)
//                .setParameter("user",dbuser)
//                .getResultList();
//
//        if(addressList.isEmpty()){
//            message="Fill Your Address Details ";
//        }else {
//
//          Address address=addressList.get(0);
//          responseObject.addProperty("lineone",address.getLine_one());
//          responseObject.addProperty("linetwo",address.getLine_two());
//          responseObject.addProperty("mobile",address.getMobile());
//          responseObject.addProperty("postalCode",address.getPostal_code());
//
//        }
//
//    }catch(Exception e){
//      e.printStackTrace();
//      message="samething wrong";
//
//    }finally {
//        hibernamtesession.close();
//    }
//    responseObject.addProperty("status",status);
//    responseObject.addProperty("message",message);
//    return responseObject.toString();
//
//
//
//}


public String profiledata(@Context HttpServletRequest request) {


    JsonObject responsenObject = new JsonObject();
    HttpSession httpsession = request.getSession(false);

    if (httpsession == null || httpsession.getAttribute("user") == null) {


        responsenObject.addProperty("status", false);
        responsenObject.addProperty("message", "Please login");
        return responsenObject.toString();
    }


    User sessionuser = (User) httpsession.getAttribute("user");
    responsenObject.addProperty("status", true);
    responsenObject.addProperty("email", sessionuser.getEmail());
    responsenObject.addProperty("firstName", sessionuser.getFirstname());
    responsenObject.addProperty("lastName", sessionuser.getLastname());
    responsenObject.addProperty("create_at", sessionuser.getCreatedAt().toString());


    return responsenObject.toString();
}

}
