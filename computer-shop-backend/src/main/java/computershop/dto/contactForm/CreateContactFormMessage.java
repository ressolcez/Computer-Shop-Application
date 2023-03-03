package computershop.dto.contactForm;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;

@Data
@AllArgsConstructor
public class CreateContactFormMessage {

    @Length(max = 40, message = "Imie nie może być dłuższe niż 40 znaków")
    @Length(min = 4, message = "Imie nie może być krótsze niż 4 znaki")
    private final String name;
    @Length(min = 4, message = "Email nie może być krótszy niż 4 znaki")
    @Email(message = "Wprowadź poprawny email")
    @Length(max = 40, message = "Emal nie może być dłuższy niż 40 znaków")
    private final String email;
    @Length(min = 4, message = "Wiadomość nie może być krótsza niż 4 znaki")
    @Length(max = 400, message = "Wiadomosć nie może być dłuższa niż 400 znaków")
    private final String message;

}
