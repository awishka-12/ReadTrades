package readtrade.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.Year;

@Entity
@Table(name = "printyear")

public class Printyear implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String year;




    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
