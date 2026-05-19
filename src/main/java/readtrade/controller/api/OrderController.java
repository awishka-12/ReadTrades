package readtrade.controller.api;


import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.service.OrdarService;

@Path("/orders")
public class OrderController {
    private final OrdarService ordarService=new OrdarService();

    @Path("/verify")
@GET
@Produces(MediaType.APPLICATION_JSON)
    public Response verifyOrder(@QueryParam("orderId") String orderId){

String responseJson=ordarService.verifyorderDeatils(orderId);
return Response.ok(responseJson).build();
    }


}
