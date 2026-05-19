package readtrade.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_status")
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true, length = 30)
    private String name; // PENDING, PAID, SHIPPED
}
