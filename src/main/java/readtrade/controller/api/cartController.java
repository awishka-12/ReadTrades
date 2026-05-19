package readtrade.controller.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Past;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.service.cartService;

@Path("/cart")
public class cartController {
    cartService cartService = new cartService();


    @Path("/removeItem")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String deletItem(@QueryParam("id") String id) {
        return cartService.deleteItem(id);
    }

@Path("/addToCart")
@GET
@Produces(MediaType.APPLICATION_JSON)
    public String addToCart(@QueryParam("bid") String bid,
                              @Context HttpServletRequest request) {

return cartService.addToCart( bid,request);
}

@Path("/all")
@GET
@Produces(MediaType.APPLICATION_JSON)
    public String getcart(@Context HttpServletRequest request) {
    return  cartService.getcart(request);
}

@Path("/updateQty")
@GET
@Produces(MediaType.APPLICATION_JSON)
public String updateQty(@QueryParam("id")String id,@QueryParam("qty")String qty,
                        @Context HttpServletRequest request) {

    return cartService.updateQty(id, qty, request);
}
}
