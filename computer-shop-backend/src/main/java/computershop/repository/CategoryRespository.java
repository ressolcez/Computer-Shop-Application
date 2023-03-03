package computershop.repository;

import computershop.model.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CategoryRespository extends JpaRepository<CategoryModel,Long> {
    @Query(value = "select category.category_name ,COUNT(order_product.product_model_id) * (order_product.quantity) as liczba\n" +
            "from order_product \n" +
            "JOIN product ON order_product.product_model_id = product.id \n" +
            "JOIN category ON product.category_model_category_id = category.id\n" +
            "GROUP BY (category.id)" ,nativeQuery = true)
    List<Map<CategoryModel,Long>> findSalesByCategory();
}
