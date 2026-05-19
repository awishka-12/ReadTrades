package readtrade.controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.apache.tomcat.util.http.ResponseUtil;
import readtrade.dto.CheckoutRequestDTO;
import readtrade.service.CheckoutService;
import readtrade.util.AppUtil;

@Path("/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService = new CheckoutService();

    @Path("/user-checkout")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response userCheckout(String requestData, @Context HttpServletRequest request) {

        CheckoutRequestDTO checkoutRequestDTO = AppUtil.GSON.fromJson(requestData, CheckoutRequestDTO.class);
String responseJson= checkoutService.processCheckout(checkoutRequestDTO, request);
return Response.ok().entity(responseJson).build();
    }

    @Path("/checkout-data")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response loadcheckoutData(@Context HttpServletRequest request) {
String responseJson =checkoutService.getCheckoutData(request);
return Response.ok().entity(responseJson).build();
    }
}
