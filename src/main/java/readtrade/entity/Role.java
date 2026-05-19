package readtrade.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "role")
@NamedQuery(name = "Role.findByName",
query = "FROM Role r WHERE r.role=:role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Column(nullable = false,length = 45)
    private String role;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users=new HashSet<User>();
}
