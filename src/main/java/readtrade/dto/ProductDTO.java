package readtrade.dto;

import java.io.Serializable;
import java.util.List;

public class ProductDTO implements Serializable {

    private int productid;
    private String title;
    private String description;
    private Double price;
    private int quantity;
    private String category;
    private String isb_number;
    private int authorid;
    private String name;
    private String bio;
    private String printyear;
    private int languageid;
    private String language;
    private String stockQuantity;
    private int printYearid;
    private int categoryid;
    private List<String> images;





    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public int getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(int categoryid) {
        this.categoryid = categoryid;
    }

    public int getPrintYearid() {
        return printYearid;
    }

    public void setPrintYearid(int printYearid) {
        this.printYearid = printYearid;
    }

    public String getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(String stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public int getProductid() {
        return productid;
    }

    public void setProductid(int productid) {
        this.productid = productid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }





    public String getIsb_number() {
        return isb_number;
    }

    public void setIsb_number(String isb_number) {
        this.isb_number = isb_number;
    }

    public int getAuthorid() {
        return authorid;
    }

    public void setAuthorid(int authorid) {
        this.authorid = authorid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }



    public String getPrintyear() {
        return printyear;
    }

    public void setPrintyear(String printyear) {
        this.printyear = printyear;
    }

    public int getLanguageid() {
        return languageid;
    }

    public void setLanguageid(int languageid) {
        this.languageid = languageid;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
