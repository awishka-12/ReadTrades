package readtrade.service;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import readtrade.dto.UserDTO;
import readtrade.entity.Role;
import readtrade.entity.Status;
import readtrade.entity.User;
import readtrade.util.AppUtil;
import readtrade.util.HibernateUtil;
import readtrade.validation.Validator;

public class AdminService {

    public String adminLogin(UserDTO userDTO, HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        boolean status = false;
        String message = "";

        // Validate inputs
        if (userDTO.getEmail() == null || userDTO.getEmail().isBlank()) {
            message = "Email is required!";
        } else if (!userDTO.getEmail().matches(Validator.EMAIL_VALIDATION)) {
            message = "Please provide a valid email address!";
        } else if (userDTO.getPassword() == null || userDTO.getPassword().isBlank()) {
            message = "Password is required!";
        } else {
            Session hibernateSession = HibernateUtil.getSessionFactory().openSession();
            try {
                // Find user by email
                User user = hibernateSession.createNamedQuery("User.getEmail", User.class)
                        .setParameter("email", userDTO.getEmail())
                        .getSingleResultOrNull();

                if (user == null) {
                    message = "Admin account not found!";
                } else if (!user.getPassword().equals(userDTO.getPassword())) {
                    message = "Invalid password!";
                } else {
                    // Check if user has ADMIN role
                    boolean isAdmin = user.getRoles().stream()
                            .anyMatch(role -> role.getRole().equals("ADMIN"));

                    if (!isAdmin) {
                        message = "Access denied! You don't have admin privileges.";
                    } else {
                        // Check account status is VERIFIED
                        Status verifiedStatus = hibernateSession
                                .createNamedQuery("Status.findByValue", Status.class)
                                .setParameter("value", String.valueOf(Status.Type.VERIFIED))
                                .getSingleResult();

                        if (!user.getStatus().equals(verifiedStatus)) {
                            message = "Your account is not verified!";
                        } else {
                            // Set admin session
                            HttpSession httpSession = request.getSession();
                            httpSession.setAttribute("admin", user);
                            httpSession.setAttribute("user", user);
                            httpSession.setMaxInactiveInterval(3600); // 1 hour

                            status = true;
                            message = "Welcome, " + user.getFirstname() + "! Login successful.";
                        }
                    }
                }
            } finally {
                hibernateSession.close();
            }
        }

        responseObject.addProperty("status", status);
        responseObject.addProperty("message", message);
        return AppUtil.GSON.toJson(responseObject);
    }

    public String adminLogout(HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        responseObject.addProperty("status", true);
        responseObject.addProperty("message", "Logged out successfully");
        return AppUtil.GSON.toJson(responseObject);
    }

    public String checkAdminSession(HttpServletRequest request) {
        JsonObject responseObject = new JsonObject();
        HttpSession session = request.getSession(false);
        boolean isAdmin = session != null && session.getAttribute("admin") != null;
        responseObject.addProperty("status", isAdmin);
        return AppUtil.GSON.toJson(responseObject);
    }
}
