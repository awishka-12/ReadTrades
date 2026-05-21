package readtrade.controller.api;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.MultivaluedMap;
import jakarta.ws.rs.core.Response;
import readtrade.service.OrdarService;
import readtrade.util.Env;
import readtrade.util.PayHereUtil;

import java.net.URI;

@Path("/payments")
public class paymentController {


    @Path("/return")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
     public Response returnOrder(@QueryParam("orderId") String orderId) {
        return Response.seeOther(URI.create(Env.getProperty("app.url") + "/invoice.html?orderId=" + orderId)).build();
    }

@Path("/cancel")
@GET
public Response paymentcancel() {
    System.out.println("Payment canceled");
return Response.ok().build();
}


@Path("/notify")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
public Response paymentVerify(MultivaluedMap<String, String> form) {
String orderId = form.getFirst("order_id");
String statuscode = form.getFirst("status_code");

if(!PayHereUtil.validateNotify(form)){
    return Response.status(Response.Status.BAD_REQUEST)
            .entity("INVALID SIGNATURE").build();
}
    OrdarService ordarService = new OrdarService();
if (Integer.parseInt(statuscode)==PayHereUtil.PAYMENT_SUCCESS){

ordarService.compleateOrder(orderId);
}else {

    ordarService.failOrder(orderId);
}
return Response.ok().build();

}

}
