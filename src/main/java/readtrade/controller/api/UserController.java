package readtrade.controller.api;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.dto.UserDTO;
import readtrade.entity.User;
import readtrade.service.UserService;
import readtrade.util.AppUtil;

import java.awt.*;

@Path("/users")
public class UserController {

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
public Response userLogin(String jsonData ,@Context HttpServletRequest request) {
UserDTO userDTO= AppUtil.GSON.fromJson(jsonData, UserDTO.class);
String responseObj=new UserService().loginUser(userDTO ,request);
return Response.ok().entity(responseObj).build();
}



@POST
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Response CreateNewAccount(String jsonData) {
    UserDTO userDTO = new Gson().fromJson(jsonData, UserDTO.class);
    String responsJson=new UserService().addNewUser(userDTO);
return Response.ok(responsJson).build();

}
}
