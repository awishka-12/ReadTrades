package readtrade.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(length = 500, nullable = false)
    private String title;

    @Column(length = 1000,nullable = false)
    private String Discription;

  @Column(nullable = false)
    private Double price;

  @Column(nullable = false , length = 100)
  private String isb_number;


  @ManyToOne
    @JoinColumn(name = "auther_id")
    private  Author author;

  @ManyToOne
    @JoinColumn(name = "caroegory_id")
    private Catagory catagory;

  @ManyToOne
  @JoinColumn(name = "printyear_id")
    private Printyear printyear;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private  Language language;

    public Language getLanguage() {
        return language;
    }

    @Column(nullable = false)
    private int quantity;

    @Column(name="images_url")
    @CollectionTable(name = "product_images",joinColumns = @JoinColumn(name = "product_id"))
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> images;



    public List<String> getImages() {
        return images;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Printyear getPrintyear() {
        return printyear;
    }

    public void setPrintyear(Printyear printyear) {
        this.printyear = printyear;
    }

    public Catagory getCatagory() {
        return catagory;
    }

    public void setCatagory(Catagory catagory) {
        this.catagory = catagory;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public String getIsb_number() {
        return isb_number;
    }

    public void setIsb_number(String isb_number) {
        this.isb_number = isb_number;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDiscription() {
        return Discription;
    }

    public void setDiscription(String discription) {
        Discription = discription;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



}
