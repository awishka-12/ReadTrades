package readtrade.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "address")
public class Address implements Serializable {

    @Id
 @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

@Column(nullable = false ,length = 100,name = "line_one")
private String line_one;

@Column(nullable = false,length = 100,name = "line_two")
private String line_two;

@Column(length = 10,name = "postal_code")
private String postal_code;

@Column(length = 10,nullable = false)
private String mobile;

    @SuppressWarnings("JpaDataSourceORMInspection")
    @Column(name = "is_primary", nullable = false)
    private boolean isPrimary=false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id",nullable = false)
    private City city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setPrimary(boolean primary) {
        isPrimary = primary;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }

    public String getLine_two() {
        return line_two;
    }

    public void setLine_two(String line_two) {
        this.line_two = line_two;
    }

    public String getLine_one() {
        return line_one;
    }

    public void setLine_one(String line_one) {
        this.line_one = line_one;
    }
}
