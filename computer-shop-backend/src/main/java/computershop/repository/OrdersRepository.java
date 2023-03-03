package computershop.repository;

import computershop.model.OrdersModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrdersRepository extends JpaRepository<OrdersModel, Long> {
    @Query("select o from OrdersModel o WHERE o.userModel.id = :userId")
    List<OrdersModel> getUserOder(Long userId);
    List<OrdersModel> findByStatus(String status);
    @Query("select SUM(o.totalPrice) from OrdersModel o")
    Double getOrdersProfit();
    @Query("select o from OrdersModel o where o.address LIKE %:searchWord% OR o.status LIKE %:searchWord%")
    Page<OrdersModel> findAllFilterable(Pageable paging, String searchWord);
}