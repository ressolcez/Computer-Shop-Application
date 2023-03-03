package computershop.service;

import computershop.model.CategoryModel;
import computershop.model.OrdersModel;
import computershop.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class AdminDashboardService {

    private final UserService userService;
    private final AuthenticationService authenticationService;
    private final OrdersService ordersService;
    private final CategoryService categoryService;

    public AdminDashboardService(UserService userService, AuthenticationService authenticationService, OrdersService ordersService, CategoryService categoryService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
        this.ordersService = ordersService;
        this.categoryService = categoryService;
    }

    public long getActiveUsers() {
        return authenticationService.getUsersMapSize();
    }

    public Long getNumberOfUsers() {
        List<UserModel> userModels = userService.getAllUsers();
        return (long) userModels.size();
    }

    public Long getNumberOfOrders() {
        List<OrdersModel> ordersModels = ordersService.getAllOrders();
        return (long) ordersModels.size();
    }


    public Long getWatingOrders() {
        String status = "W trakcie realizacji";
        List<OrdersModel> ordersModels = ordersService.getOrdersByStatus(status);
        return (long) ordersModels.size();
    }


    public Double getOrdersProfit() {
        Double profit = ordersService.getOrdersProfit();
        return Objects.requireNonNullElseGet(profit, () -> (double) 0);
    }

    public List<Map<CategoryModel, Long>> getSalesByCategory() {
        return categoryService.getSalesByCategory();
    }
}
