package computershop.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseCartDTO {
    private final Double finalPrice;
    private final Integer totalItems;
}
