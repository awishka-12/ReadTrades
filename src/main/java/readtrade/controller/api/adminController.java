package readtrade.controller.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.dto.UserDTO;
import readtrade.service.AdminService;
import readtrade.util.AppUtil;

@Path("/admin")
public class adminController {

    private final AdminService adminService = new AdminService();

    // ✅ Admin login
    @Path("/admin-login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response adminLogin(String requestData,
                               @Context HttpServletRequest request) {
        UserDTO userDTO = AppUtil.GSON.fromJson(requestData, UserDTO.class);
        String responseJson = adminService.adminLogin(userDTO, request);
        return Response.ok(responseJson).build();
    }

    // ✅ Admin logout
    @Path("/logout")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response adminLogout(@Context HttpServletRequest request) {
        String responseJson = adminService.adminLogout(request);
        return Response.ok(responseJson).build();
    }

    // ✅ Check admin session
    @Path("/check-session")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkSession(@Context HttpServletRequest request) {
        String responseJson = adminService.checkAdminSession(request);
        return Response.ok(responseJson).build();
    }
}

