package readtrade.service;

import com.google.gson.JsonObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import readtrade.dto.ProductDTO;
import readtrade.entity.Book;
import readtrade.util.AppUtil;
import readtrade.util.HibernateUtil;
import readtrade.validation.Validator;

import java.util.ArrayList;
import java.util.List;

public class SingleProductService {

    public String getProduct(String bookId){
        JsonObject responseJson=new JsonObject();
        String message="";
        boolean  status=false;

        if(bookId==null||bookId.isEmpty()){
            message="Please enter book ID";
        }else if(!bookId.matches(Validator.IS_INTEGER)){
            message="Please enter a valid book ID";
        }else {

        int bid=Integer.parseInt(bookId);
        Session hibernatesession=HibernateUtil.getSessionFactory().openSession();

            Book book=hibernatesession.get(Book.class,bid);

            ProductDTO  productDTO=new ProductDTO();
            productDTO.setDescription(book.getDiscription());
            productDTO.setPrice(book.getPrice());
            productDTO.setName(book.getAuthor().getName());
            productDTO.setTitle(book.getTitle());
            productDTO.setCategory(book.getCatagory().getName());
            productDTO.setLanguage(book.getLanguage().getLanguage());
            productDTO.setQuantity(book.getQuantity());

            if (book.getImages() != null && !book.getImages().isEmpty()) {

                List<String> imagelist=new ArrayList<>();
                for (String image : book.getImages()) {
                    String filename=image.substring(image.lastIndexOf("/")+1);
                    imagelist.add(filename);
                }
                productDTO.setImages(imagelist);

            }else {
                productDTO.setImages(List.of("default.jpg"));
            }


            status=true;
            responseJson.add("products",AppUtil.GSON.toJsonTree(productDTO));
            hibernatesession.close();
        }
        responseJson.addProperty("status",status);
        responseJson.addProperty("message",message);
        return AppUtil.GSON.toJson(responseJson);
    }

}
