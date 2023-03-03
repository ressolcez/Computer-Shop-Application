package computershop.dto.orders;

import computershop.dto.cart.CartDTO;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link computershop.model.OrdersModel} entity
 */
@Data
public class AddOrderDTO implements Serializable {

    @Min(message = "Wprowadź poprawną cenę", value = 1)
    @NotNull(message = "Wprowadź cenę")
    private final Double totalPrice;
    @Length(max = 120, message = "Adres nie może być dłuższy niż 120 znaków")
    @NotEmpty(message = "Wprowadź adres")
    private final String address;
    @Length(max = 20, message = "Numer domu nie może być dłuższy niż 20 znaków")
    @NotEmpty(message = "Wprowadź numer domu")
    private final String houseNumber;
    @Length(max = 20, message = "Kod pocztowy nie może być dłuższy niż 20 znaków")
    @NotEmpty(message = "Wprowadź kod pocztowy")
    private final String postalCode;

    private final List<CartDTO> cartDTOList;
}