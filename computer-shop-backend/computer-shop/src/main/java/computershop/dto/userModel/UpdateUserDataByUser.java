package computershop.dto.userModel;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

/**
 * A DTO for the {@link computershop.model.UserModel} entity
 */
@Data
public class UpdateUserDataByUser implements Serializable {
    @NotEmpty(message = "Wprowadź imie")
    @Length(max = 40, message = "Imie nie może być dłuższe niż 40 znaków")
    private final String name;
    @NotEmpty(message = "Wprowadź nazwisko")
    @Length(max = 60, message = "Nazwisko nie może być dłuższe niż 40 znaków")
    private final String surname;
    @Length(max = 120, message = "Adres nie może być dłuższy niż 120 znaków")
    private final String address;
    @Length(max = 20, message = "Numer domu nie może być dłuższy niż 20 znaków")
    private final String houseNumber;
    @Length(max = 20, message = "Kod pocztowy nie może być dłuższy niż 20 znaków")
    private final String postalCode;
}