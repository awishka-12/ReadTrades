package readtrade.controller.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import readtrade.dto.ProductDTO;
import readtrade.service.BookService;
import readtrade.service.ProfileService;
import readtrade.util.AppUtil;

@Path("/book")
public class productmanageController {

    @Path("/newLanguage")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response newLanguage(String jsonData,@Context HttpServletRequest request) {
        ProductDTO productDTO = AppUtil.GSON.fromJson(jsonData,ProductDTO.class);
        String responseObj=new BookService().addNewLanguage(request,productDTO);
        return Response.ok().entity(responseObj).build();
    }

    @Path("/newauther")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response newauther(String jsonData, @Context HttpServletRequest request) {
        ProductDTO productDTO = AppUtil.GSON.fromJson(jsonData, ProductDTO.class);
        String responseObj=new BookService().addNewAuther(request,productDTO);
        return Response.ok().entity(responseObj).build();
    }

    @Path("/newcategory")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response newcategory(String jsonData, @Context HttpServletRequest request) {
        ProductDTO productDTO = AppUtil.GSON.fromJson(jsonData, ProductDTO.class);
        String responseObj=new BookService().addNewCategory(request,productDTO);
            return Response.ok().entity(responseObj).build();
    }
}
