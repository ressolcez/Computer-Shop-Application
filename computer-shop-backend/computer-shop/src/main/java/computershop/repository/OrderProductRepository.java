package computershop.repository;

import computershop.model.OrderProductModel;
import computershop.model.OrdersModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductRepository extends JpaRepository<OrderProductModel, Long> {

}