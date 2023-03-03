package computershop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
public class OrdersModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "total_price", nullable = false)
    private Double totalPrice;
    @ManyToOne(optional = false)
    @JsonBackReference
    @JoinColumn(name = "user_model_id", nullable = false)
    private UserModel userModel;

    @OneToMany(mappedBy = "ordersModel", orphanRemoval = true)
    @JsonManagedReference
    private List<OrderProductModel> orderProductModels = new ArrayList<>();

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "address")
    private String address;

    @Column(name = "house_number")
    private String houseNumber;

    @Column(name = "postal_code")
    private String postalCode;


}