package computershop.dto.opinionsModel;

import lombok.*;

import java.io.Serializable;

/**
 * A DTO for the {@link computershop.model.OpinionsModel} entity
 */
@Data
@AllArgsConstructor
public class OpinionsToProductSummary implements Serializable {
    private final Double finalRate;
    private final Integer numberOfOpinions;
}