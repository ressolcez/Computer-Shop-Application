package computershop.dto.userModel;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

/**
 * A DTO for the {@link computershop.model.UserModel} entity
 */
@Data
public class AddUserModelDto implements Serializable {

    @NotEmpty(message = "Wprowadź imie")
    @Length(min = 3, max = 40, message = "Imie nie może być dłuższe niż 40 znaków")
    private final String name;
    @NotEmpty(message = "Wprowadź nazwisko")
    @Length(max = 60, message = "Nazwisko nie może być dłuższe niż 40 znaków")
    private final String surname;
    @NotEmpty(message = "Wprowadź Login")
    @Length(max = 25, message = "Login nie może być dłuższy niż 25 znaków")
    private final String login;
    @NotEmpty(message = "Wprowadź email")
    @Email(message = "Wprowadź Email")
    private final String email;
    @NotEmpty(message = "Wprowadź Hasło")
    @Length(max = 70, message = "Hasło nie może być dłuższe niż 70 znaków")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\\S+$).{8,}$", message = "Hasło musi zawierać minimum 8 znaków, w tym małą i wielką literę cyfrę i znak specjalny")
    private final String password;
    @Length(max = 120, message = "Adres nie może być dłuższy niż 120 znaków")
    private final String address;
    @Length(max = 20, message = "Numer domu nie może być dłuższy niż 20 znaków")
    private final String houseNumber;
    @Length(max = 20, message = "Kod pocztowy nie może być dłuższy niż 20 znaków")
    private final String postalCode;
}