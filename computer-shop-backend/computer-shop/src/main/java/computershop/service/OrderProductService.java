package computershop.service;

import computershop.dto.cart.CartDTO;
import computershop.model.OrderProductModel;
import computershop.model.ProductModel;
import computershop.repository.OrderProductRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderProductService {
    private final OrderProductRepository orderProductRepository;
    private final ProductService productService;

    public OrderProductService(OrderProductRepository orderProductRepository, ProductService productService) {
        this.orderProductRepository = orderProductRepository;
        this.productService = productService;
    }
    public void addOrderProduct(OrderProductModel orderProductModel){
        orderProductRepository.save(orderProductModel);
    }

    public Long checkoutCart(Long productId, Integer quantity) {
        ProductModel productModel = productService.getProductById(productId);
        if(productModel.getQuantityAvailable() < quantity){
            return productId;
        }
        return null;
    }

    public double getCartTotalPrice(List <CartDTO> list){

        Map<ProductModel, Integer> productModels = new HashMap<>();

        double totalPrice = 0;

        for (CartDTO cartDTO : list) {
            productModels.put(productService.getProductById(cartDTO.getId()), cartDTO.getQuantity());
        }

        for (Map.Entry<ProductModel, Integer> entry : productModels.entrySet()) {
            ProductModel key = entry.getKey();
            Integer value = entry.getValue();
            totalPrice += key.getPrice() * value;
        }

        return totalPrice;
    }
}
