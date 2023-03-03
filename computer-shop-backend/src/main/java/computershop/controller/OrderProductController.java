package computershop.controller;

import computershop.dto.cart.CartDTO;
import computershop.service.OrderProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequestMapping("/api/orderProduct")
@CrossOrigin("*")
@RestController
public class OrderProductController {
    private final OrderProductService orderProductService;

    public OrderProductController(OrderProductService orderProductService) {
        this.orderProductService = orderProductService;
    }

    @PostMapping("/checkoutCart")
    public ResponseEntity<List<Long>> checkoutCart(@RequestBody List<CartDTO> cartDTOS){

        List<Long> list = new ArrayList<>();
        cartDTOS.forEach((n) -> list.add(orderProductService.checkoutCart(n.getId(), n.getQuantity())));

        list.removeAll(Collections.singletonList(null));

        if(list.size() != 0){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(list);
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
