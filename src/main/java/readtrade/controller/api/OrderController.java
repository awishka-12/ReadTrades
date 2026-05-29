package readtrade.controller.api;


import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.service.InvoiceService;
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


    @Path("/complete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response completeOrder(@QueryParam("orderId") String orderId) {
        try {
            ordarService.compleateOrder(orderId);
            return Response.ok("{\"status\":true}").build();
        } catch(Exception e) {
            return Response.status(500)
                    .entity("{\"status\":false}").build();
        }
    }

    @Path("/invoice")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInvoice(@QueryParam("orderId") String orderId) {
        String responseJson = new InvoiceService().getInvoice(orderId);
        return Response.ok(responseJson).build();
    }
}
