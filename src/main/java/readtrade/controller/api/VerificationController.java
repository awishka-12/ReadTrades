package readtrade.controller.api;

import com.google.gson.Gson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.dto.UserDTO;
import readtrade.service.UserService;


@Path("/verificationAccount")
public class VerificationController {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
   public Response  verificationAccount(String jsonData) {

    Gson gson = new Gson();
    UserDTO userDTO = gson.fromJson(jsonData, UserDTO.class);
   String responseJson=new UserService().verificationAccount(userDTO);
   return Response.ok(responseJson).build();
}

}
