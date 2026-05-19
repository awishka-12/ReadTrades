package readtrade.controller.api;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.service.SingleProductService;
import readtrade.util.AppUtil;

@Path("/single-products")
public class SingleProdcutController {


    @Path("/product")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
public Response loadproduct(@QueryParam("bookId") String bookId){
String responseJson=new SingleProductService().getProduct(bookId);
return Response.ok().entity(responseJson).build();
}
}
