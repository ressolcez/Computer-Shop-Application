package computershop.controller;
import computershop.dto.orders.AddOrderDTO;
import computershop.model.OrdersModel;
import computershop.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/orders")
@CrossOrigin("*")
@RestController
public class OrdersController {
    @Autowired
    OrdersService ordersService;
    @PostMapping("/{userId}")
    public ResponseEntity<Long> addOrder(@PathVariable Long userId, @Valid @RequestBody AddOrderDTO addOrderDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(ordersService.addOrder(userId,addOrderDTO));
    }
    @GetMapping("/Pageable")
    public ResponseEntity<Map<String, Object>> getAllOrdersPageable(@RequestParam Integer pageNumber){
        int pageSize = 11;
        return ResponseEntity.status(HttpStatus.OK).body(ordersService.getAllOrdersPageable(pageNumber,pageSize));
    }

    @GetMapping("/ordersWithDifference")
    public ResponseEntity<Map<String, Object>> getAllOrdersWithDifference(@RequestParam Integer pageNumber, @RequestParam String searchWord){
        int pageSize = 8;
        return ResponseEntity.status(HttpStatus.OK).body(ordersService.getAllOrdersWithDifference(pageNumber,pageSize,searchWord));
    }

    @GetMapping("/createOrderMail/{userId}/{orderId}")
    public ResponseEntity<Object> createOrderMail(@PathVariable Long userId, @PathVariable Long orderId){
        ordersService.createOrderMail(userId,orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrdersModel> getOrderbyId(@PathVariable Long orderId) {
        return ResponseEntity.status(HttpStatus.OK).body(ordersService.getOrderbyId(orderId));
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Map<String, String>> changeOrderStatus(@PathVariable Long orderId, @RequestParam String orderStatus, @RequestParam (name = "comment", required = false) String comment){
        ordersService.changeOrderStatus(orderId,orderStatus,comment);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Object> deleteOrder(@PathVariable Long orderId){
        ordersService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/userOrder/{userId}")
    public ResponseEntity<List<OrdersModel>> getUserOrder(@PathVariable Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(ordersService.getUserOrder(userId));
    }
}