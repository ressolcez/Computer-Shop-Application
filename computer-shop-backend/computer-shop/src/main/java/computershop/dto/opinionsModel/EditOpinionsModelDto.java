package computershop.dto.opinionsModel;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A DTO for the {@link computershop.model.OpinionsModel} entity
 */
@Data
public class EditOpinionsModelDto implements Serializable {
    private final Long id;
    @NotEmpty(message = "Wprowadź Opinie")
    @Length(max = 100, message = "Opinia nie może być dłuższa niż 100 znaków")
    private final String comment;
    @Min(message = "Wprowadź poprawną ocenę", value = 1)
    @NotNull(message = "Wprowadź poprawną ocene")
    private final Double rate;
}