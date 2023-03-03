package computershop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Product")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slider", nullable = false)
    private Boolean slider;

    @Column(name = "producent")
    private String producent;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "price")
    private Double price;

    @ManyToOne(optional = false)
    @JsonManagedReference
    @JoinColumn(name = "category_model_category_id", nullable = false)
    private CategoryModel categoryModel;

    @OneToMany(mappedBy = "productModel", orphanRemoval = true)
    @JsonBackReference
    private List<OpinionsModel> opinionsModels = new ArrayList<>();

    @OneToMany(mappedBy = "productModel", orphanRemoval = true)
    @JsonBackReference
    private List<OrderProductModel> orderProductModels = new ArrayList<>();
    @Column(name = "quantity_available")
    private Integer quantityAvailable;

}
