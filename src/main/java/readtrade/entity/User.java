package readtrade.entity;


import jakarta.persistence.*;
import jdk.jfr.Name;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@NamedQuery(name = "User.getEmail",
          query = "FROM User u WHERE u.email=:email")
public class User extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

 @Column(name = "first_name",nullable = false,length = 45)
     private String firstname;

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    @Column(name = "last_name", nullable = false,length = 45)
  private String lastname;

    @Column(nullable = false,length = 100 ,unique = true)
    private String email;

    @Column(nullable = false,length = 20)
    private String password;

  @Column(name = "verification_code",nullable = false,length = 20)
    private String verificationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;

    @ManyToMany
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id")
    )
    private Set<Role> roles=new HashSet<>();


    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Address> addresses = new HashSet<>();


    @OneToMany(mappedBy = "user")
   private Set<Cart> cart=new HashSet<>();

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Set<Address> getAddress() {
        return addresses;
    }

    public void setAddress(Set<Address> address) {
        this.addresses = address;
    }

    public Set<Cart> getCart() {
        return cart;
    }

    public void setCart(Set<Cart> cart) {
        this.cart = cart;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
}
