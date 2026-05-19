package readtrade.controller.api;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.service.IndexService;

@Path("/loadindexproducts")
public class loadindexProdcutController {

    @Path("/load")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProducts(@QueryParam("search") String search ,
                                @QueryParam("category") @DefaultValue("0") int categoryid,
                                @QueryParam("page") @DefaultValue("1")int page,
                                @QueryParam("size") @DefaultValue("8")int size) {

        String responsejson=new IndexService().loadIndexProduct(search,categoryid,page,size);
        return Response.ok(responsejson).build();
    }
}
