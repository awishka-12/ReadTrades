package readtrade.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedQuery(name = "Status.findByValue" ,
query = "FROM Status s WHERE s.name =:value")

public class Status implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

   @Column(nullable=false,length=45 ,unique=true)
    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public enum Type {
        ACTIVE,
        PENDING,
        INACTIVE,
        BLOCKED,
        DELIVERED,
        PACKING,
        APPROVED,
        REJECTED,
        CANCELED,
        VERIFIED,
        RECEIVED,
        COMPLETED
    }
}
