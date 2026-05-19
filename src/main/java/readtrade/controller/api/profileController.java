package readtrade.controller.api;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.dto.UserDTO;
import readtrade.entity.User;
import readtrade.service.ContentService;
import readtrade.service.ProfileService;
import readtrade.util.AppUtil;

@Path("/profiles")
public class profileController {

    @Path("/changePassword")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response changePassword(@Context HttpServletRequest request, String jsonData ) {
        UserDTO userDTO=new Gson().fromJson(jsonData,UserDTO.class);
        String respnsejson=new ProfileService().updatePassword(request,userDTO);
        return Response.ok().entity(respnsejson).build();
    }

    @Path("/updateAddress")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response AssUserAddress(String jsonData,@Context HttpServletRequest request){
        UserDTO userDTO=AppUtil.GSON.fromJson(jsonData,UserDTO.class);
      String responsejson=new ContentService().SaveAddress(userDTO,request);
        return Response.ok().entity(responsejson).build();
    }

    @PUT
    @Path("/Name")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateName(String jsonData, @Context HttpServletRequest request) {

UserDTO userDTO = AppUtil.GSON.fromJson(jsonData, UserDTO.class);
String responseJson=new ContentService().updateuser(userDTO,request);
return Response.ok().entity(responseJson).build();
    }



    @Path("/city")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response city(){
String responseJson=new ContentService().loadAddress();
return Response.ok(responseJson).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/profiledetails")
    public Response profile(@Context HttpServletRequest request) {
String responsejson=new ProfileService().profiledata(request);
       return Response.ok(responsejson).build();
    }


//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    @Path("/Addressdetails")
//    public Response Addressdate(@Context HttpServletRequest request) {
//        String responsejson=new ProfileService().Addressdata(request);
//        return   Response.ok(responsejson).build();
//    }
}
