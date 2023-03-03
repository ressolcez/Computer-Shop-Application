package computershop.controller;

import computershop.model.CategoryModel;
import computershop.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/adminDashboard")
@CrossOrigin("*")
@RestController
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;

    @GetMapping("/numberOfUsers")
    public Long getNumberOfUsers(){
        return adminDashboardService.getNumberOfUsers();
    }

    @GetMapping("/activeUsers")
    public ResponseEntity<Long> getActiveUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(adminDashboardService.getActiveUsers());
    }

    @GetMapping("/numberOfOrders")
    public ResponseEntity<Long> getNumberOfOrders(){
        return ResponseEntity.status(HttpStatus.OK).body(adminDashboardService.getNumberOfOrders());
    }

    @GetMapping("/waitingOrders")
    public ResponseEntity<Long> getWaitingOrders(){
        return ResponseEntity.status(HttpStatus.OK).body(adminDashboardService.getWatingOrders());
    }

    @GetMapping("/profit")
    public ResponseEntity<Double> getProfit(){
        return ResponseEntity.status(HttpStatus.OK).body(adminDashboardService.getOrdersProfit());
    }

    @GetMapping("/salesByCategory")
    public ResponseEntity<List<Map<CategoryModel, Long>>> getSalesByCategory(){
        return ResponseEntity.status(HttpStatus.OK).body(adminDashboardService.getSalesByCategory());
    }
}
