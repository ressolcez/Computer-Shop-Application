package computershop.dto.orders;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import computershop.model.OrderProductModel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * A DTO for the {@link computershop.model.OrdersModel} entity
 */
@Data
@Getter
@Setter
@NoArgsConstructor
public class OrdersModelWithDifference implements Serializable {
    private  Long id;
    private Double totalPrice;
    @JsonManagedReference
    private List<OrderProductModel> orderProductModels;
    private LocalDate date;
    private String status;
    private  String address;
    private  String houseNumber;
    private  String postalCode;
    private  String difference;
    private  Boolean isDelayed;
}