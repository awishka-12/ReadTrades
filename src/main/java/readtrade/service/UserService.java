package readtrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.Context;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.dto.UserDTO;
import readtrade.entity.Role;
import readtrade.entity.Status;
import readtrade.entity.User;
import readtrade.mail.VerificationMail;
import readtrade.provider.MailServiceProvider;
import readtrade.util.AppUtil;
import readtrade.util.HibernateUtil;
import readtrade.validation.Validator;

import java.util.regex.Pattern;

public class UserService {

    public String loginUser(UserDTO userDTO, @Context HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";




        if (userDTO.getEmail() == null) {
            message = "Email is required!";
        } else if (userDTO.getEmail().isBlank()) {
            message = "Email address can not be empty!";
        } else if (!userDTO.getEmail().matches(Validator.EMAIL_VALIDATION)) {
            message = "Please provide valid email address!";
        } else if (userDTO.getPassword() == null) {
            message = "Password is required!";
        } else if (userDTO.getPassword().isBlank()) {
            message = "Password can not be empty!";
        } else if (!userDTO.getPassword().matches(Validator.PASSWORD_VALIDATION)) {
            message = "Please provide valid password. \n " +
                    "The password must be at least 8 characters long and include at least one uppercase letter, " +
                    "one lowercase letter, one digit, and one special character";
        } else {
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            User singleUser = hibernateSession.createNamedQuery("User.getEmail", User.class)
                    .setParameter("email", userDTO.getEmail())
                    .getSingleResultOrNull();
            if (singleUser == null) {
                message = "Account not found. Please register first!";
            } else {
                if (!singleUser.getPassword().equals(userDTO.getPassword())) {
                    message = "Something went wrong. Please check your login credentials!";
                } else {
                    Status verifiedStatus = hibernateSession.createNamedQuery("Status.findByValue", Status.class)
                            .setParameter("value", String.valueOf(Status.Type.VERIFIED))
                            .getSingleResult();
                    if (!singleUser.getStatus().equals(verifiedStatus)) {
                        message = "Your account is not verified. Please verify first!";
                    } else {
                        HttpSession httpSession = request.getSession();
                        httpSession.setAttribute("user", singleUser);
                        status = true;
                        message = "Login successful";


                    }
                }
            }
            hibernateSession.close();
        }



        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }






    public String verificationAccount(UserDTO userDTO) {

       JsonObject responseObject = new JsonObject();
     boolean status=false;
     String message="";

        if (userDTO.getEmail() == null) {
            message = "Email is required!";
        } else if (userDTO.getEmail().isBlank()) {
            message = "Email address can not be empty!";
        } else if (!userDTO.getEmail().matches(Validator.EMAIL_VALIDATION)) {
            message = "Please provide valid email address!";
        } else if (userDTO.getVerificationCode() == null) {
            message = "Verification is required!";
        } else if (userDTO.getVerificationCode().isBlank()) {
            message = "Verification code can not be empty!";
        } else if (!userDTO.getVerificationCode().matches(Validator.VERIFICATION_CODE_VALIDATION)) {
            message = "Please provide valid verification code!. Verification code must have 6 digits";
        }else{

         Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
         User user=hibernateSession.createQuery("FROM User u WHERE u.email=:email AND u.verificationCode=:verificationCode", User.class)
                 .setParameter("email", userDTO.getEmail())
                 .setParameter("verificationCode", userDTO.getVerificationCode())
                 .getSingleResultOrNull();

         if(user==null){
             message = "User not found!";
         }else {
         Status verificationStatus=hibernateSession.createNamedQuery("Status.findByValue",Status.class)
                 .setParameter("value",String.valueOf(Status.Type.VERIFIED))
                 .getSingleResult();

         if(user.getStatus().equals(verificationStatus)){
             message = "User is already verified!";
         }else {
         user.setStatus(verificationStatus);
          user.setVerificationCode("");
        Transaction transaction=hibernateSession.beginTransaction();

     try {

     hibernateSession.merge(user);
    transaction.commit();
      status=true;
     message="User verified successfully!";
       } catch (HibernateException e) {

       transaction.rollback();
         message = e.getMessage();
          }
         }

         }


        }

responseObject.addProperty("status",status);
responseObject.addProperty("message",message);
return AppUtil.GSON.toJson(responseObject);

    }


    public String addNewUser(UserDTO userDTO) {

        JsonObject response = new JsonObject();
        boolean status = false;
        String message;

        /* =======================
           1️⃣ BASIC VALIDATION
           ======================= */
        if (userDTO == null) {
            message = "Invalid request";
        } else if (isBlank(userDTO.getFirstName())) {
            message = "First Name is required";
        } else if (isBlank(userDTO.getLastName())) {
            message = "Last Name is required";
        } else if (isBlank(userDTO.getEmail())) {
            message = "Email is required";
        } else if (isBlank(userDTO.getPassword())) {
            message = "Password is required";
        } else if (!userDTO.getEmail().matches(Validator.EMAIL_VALIDATION)) {
            message = "Invalid Email";
        } else if (!userDTO.getPassword().matches(Validator.PASSWORD_VALIDATION)) {
            message = "Invalid Password. Password must contain at least 8 characters, one number and one special character.";
        } else {

            Session session = null;
            Transaction tx = null;

            try {
                session = HibernateUtil.getSessionFactory().openSession();

                User existingUser = session
                        .createNamedQuery("User.getEmail", User.class)
                        .setParameter("email", userDTO.getEmail())
                        .uniqueResult();

                if (existingUser != null) {
                    message = "Email already exists";
                } else {


                    Status pendingStatus = session
                            .createNamedQuery("Status.findByValue", Status.class)
                            .setParameter("value", String.valueOf(Status.Type.PENDING))
                            .getSingleResult();


               System.out.println(pendingStatus);

                    User user = new User();
                    user.setFirstname(userDTO.getFirstName().trim());
                    user.setLastname(userDTO.getLastName().trim());
                    user.setEmail(userDTO.getEmail().trim());
                    user.setPassword(userDTO.getPassword());
                    user.setStatus(pendingStatus);

                    String verificationCode = AppUtil.generateCode();
                    user.setVerificationCode(verificationCode);


                    session.persist(user);

                    tx = session.beginTransaction();
                    tx.commit();

                    Role userRole = session
                            .createNamedQuery("Role.findByName", Role.class)
                            .setParameter("role", "USER")
                            .getSingleResult();


                    user.getRoles().add(userRole);

                    MailServiceProvider.getInstance().start();
                    VerificationMail mail =
                            new VerificationMail(user.getEmail(), verificationCode);
                    MailServiceProvider.getInstance().sendMail(mail);

                    status = true;
                    message = "Account created successfully. Verification code has been sent to the your email." +
                            "Please verify it for activate your account!. ";
                }

            } catch (Exception e) {
                if (tx != null) tx.rollback();
                e.printStackTrace();
                message = "Account creation failed. Please try again.";
            } finally {
                if (session != null) session.close();
            }
        }

        response.addProperty("status", status);
        response.addProperty("message", message);
        return AppUtil.GSON.toJson(response);
    }


    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
