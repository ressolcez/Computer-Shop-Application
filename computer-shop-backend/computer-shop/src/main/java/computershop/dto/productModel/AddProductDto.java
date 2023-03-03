package computershop.dto.productModel;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A DTO for the {@link computershop.model.ProductModel} entity
 */
@Data
@Builder
public class AddProductDto implements Serializable {
    @NotEmpty(message = "Wprowadź poprawną nazwę nazwe")
    @Length(min = 3, max = 220, message = "Wprowadź poprawną długość nazwy przedmiotu")
    private final String name;
    @NotNull(message = "Uzupełnij Slider")
    private final Boolean slider;
    @NotNull(message = "Wprowadź poprawną ilość")
    @Min(message = "Wprowadź poprawną ilość", value = 0)
    private Integer quantityAvailable;
    @Length(min = 1, max = 220, message = "Wprowadź poprawną długość nazwy producenta")
    @NotEmpty(message = "Wprowadź poprawnego producenta")
    private final String producent;
    @Length(min = 5, max = 220, message = "Wprowadź poprawny opis przedmiotu")
    @NotEmpty(message = "Wprowadź poprawny opis")
    private final String description;
    @NotEmpty(message = "Wprowadź poprawne zdjęcie")
    @Length(min = 1, max = 240, message = "Wprowadź poprawne zdjęcie przedmiotu")
    private final String image;
    @Min(message = "Wprowadź poprawną cenę", value = 1)
    @NotNull(message = "Wprowadź cenę")
    private final Double price;
}