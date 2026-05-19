package readtrade.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private  int id;

@Column(nullable = false)
private int stockquantity;

    @Column(nullable = false)
    private double price;

@OneToOne
@JoinColumn(name = "book_id")
    private Book book;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public int getStockquantity() {
        return stockquantity;
    }

    public void setStockquantity(int stockquantity) {
        this.stockquantity = stockquantity;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
