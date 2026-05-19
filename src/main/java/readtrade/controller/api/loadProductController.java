package readtrade.controller.api;

import com.google.gson.JsonObject;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import readtrade.dto.ProductDTO;
import readtrade.service.ContentService;
import readtrade.service.FileUploadSevice;
import readtrade.service.ProdcutService;
import readtrade.service.ProductContentService;
import readtrade.util.AppUtil;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Path("/loadproduct")
public class loadProductController {

@Path("/get-products")
@GET
@Produces(MediaType.APPLICATION_JSON)
public Response getProducts(@QueryParam("page") @DefaultValue("1") int page,
                            @QueryParam("size") @DefaultValue("5")int size,
                            @QueryParam("category") @DefaultValue("0") int category,
                            @QueryParam("author") @DefaultValue("0") int author,
                            @QueryParam("year") @DefaultValue("0") int year) {

String responseJson=new ProdcutService().getAllproducts(page,size,category,author,year);
return Response.ok(responseJson).build();
}



@Path("/save-product")
@POST
 @Consumes(MediaType.APPLICATION_JSON)
public Response saveProduct(ProductDTO productDTO, @Context HttpServletRequest request){

     String responseJson=new ProdcutService().addNewProduct(productDTO,request);
return Response.ok().entity(responseJson).build();
 }


@Path("/{productid}/upload-image")
@POST
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)
public Response uploadImage(
        @PathParam("productid") int productid,
        @FormDataParam("image") InputStream fileInputStream,
        @FormDataParam("image") FormDataContentDisposition fileMetaData,
        @Context ServletContext context) {

    JsonObject jsonResponse = new JsonObject();
    try {

        FileUploadSevice fileUploadSevice=new FileUploadSevice(context);
        FileUploadSevice.FileItem fileItem=fileUploadSevice.uploadFile("products",fileInputStream,fileMetaData);
        boolean isUpdate=new ProdcutService().updateProductImage(productid,fileItem.getUrl());

if (isUpdate){
jsonResponse.addProperty("status","success");
jsonResponse.addProperty("message","Product Image has been uploaded successfully");
}else {
    jsonResponse.addProperty("status","error");
    jsonResponse.addProperty("message","Product Image has been uploaded failed");
}
    }catch (Exception e){
        jsonResponse.addProperty("status", false);
        jsonResponse.addProperty("message", e.getMessage());
    }

    return Response.ok().entity(jsonResponse.toString()).build();

}




    @Path("/year")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response loadyear() {
        String responseObject=new ProductContentService().loadyear();
        return Response.ok(responseObject).build();
    }

    @Path("/languages")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response languages() {
        String responseObject=new ProductContentService().loadlanguages();
        return Response.ok(responseObject).build();
    }

    @Path("/author")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response author() {
       String responseJson=new ProductContentService().loadAuthor();
        return Response.ok(responseJson).build();
    }

    @Path("/category")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response category() {
       String responseJson=new ProductContentService().loadCategory();
       return Response.ok(responseJson).build();
    }

}
