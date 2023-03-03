package computershop.dto.cart;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartDTO {
    private Long id;
    private Integer quantity;
}
