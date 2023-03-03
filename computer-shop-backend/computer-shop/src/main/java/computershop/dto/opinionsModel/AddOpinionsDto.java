package computershop.dto.opinionsModel;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A DTO for the {@link computershop.model.OpinionsModel} entity
 */
@Data
@Getter
@Setter
public class AddOpinionsDto implements Serializable {

    @NotEmpty(message = "Wprowadź Komentarz")
    @Length(max = 50, message = "Opinia nie może być dłuższa niż 50 znaków")
    private final String comment;
    @Min(message = "Wprowadź poprawną ocenę", value = 1)
    @NotNull(message = "Wprowadź poprawną ocene")
    private final Double rate;

}