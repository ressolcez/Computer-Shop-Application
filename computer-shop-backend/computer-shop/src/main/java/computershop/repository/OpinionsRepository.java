package computershop.repository;

import computershop.model.OpinionsModel;
import computershop.model.ProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface OpinionsRepository extends JpaRepository<OpinionsModel,Long>, PagingAndSortingRepository<OpinionsModel,Long> {

    @Query("SELECT c FROM OpinionsModel c WHERE c.productModel.id = :Product_id")
    Page<OpinionsModel> getOpinionToProduct(Long Product_id, Pageable paging);

    @Query("SELECT c FROM OpinionsModel c WHERE c.productModel.id = :Product_id")
    List<OpinionsModel> findOpinionsModelByProductModel(Long Product_id);

}