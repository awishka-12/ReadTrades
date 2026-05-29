package readtrade.service;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.dto.UserDTO;
import readtrade.util.AppUtil;

@Path("/admin")
public class AdminService {

    @Path("/admin-login")

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)

    public Response adminLogin(
            String requestData,
            @Context HttpServletRequest request
    ){

        UserDTO userDTO =
                AppUtil.GSON.fromJson(
                        requestData,
                        UserDTO.class
                );
        return null;
    }
}
