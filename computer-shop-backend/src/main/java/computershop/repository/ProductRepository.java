package computershop.repository;

import computershop.model.ProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductRepository  extends JpaRepository<ProductModel,Long>, PagingAndSortingRepository<ProductModel,Long> {
    List<ProductModel> findBySlider(Boolean state);
    Page<ProductModel> findByPriceBetween(Double minPrice, Double maxPrice, Pageable paging);
    @Query("select p from ProductModel p WHERE p.categoryModel.categoryName IN :categories AND p.price BETWEEN :minPrice AND :maxPrice")
    Page<ProductModel> findByCategoryModelCategoryNameAndPriceBetween(List<String> categories, Double minPrice, Double maxPrice, Pageable paging);
    @Query("select p from ProductModel p WHERE p.producent IN :manufacturer AND p.price BETWEEN :minPrice AND :maxPrice")
    Page<ProductModel> findByProducentInBetweenPrice(List<String> manufacturer, Double minPrice, Double maxPrice, Pageable paging);
    @Query("select p from ProductModel p WHERE p.categoryModel.categoryName IN :categories AND p.producent IN :manufacturer AND p.price BETWEEN :minPrice AND :maxPrice")
    Page<ProductModel> findByProducentIn_OrCategoryModel_NameInBetweenPrice(List<String> categories, Double minPrice, Double maxPrice, List<String> manufacturer, Pageable paging);
    @Query("select p from ProductModel p WHERE p.categoryModel.categoryName LIKE %:searchWord% or p.name LIKE %:searchWord% or p.producent LIKE %:searchWord%")
    List<ProductModel> findByNameOrProducentOrCategoryModelName(String searchWord);
    @Query("select p from ProductModel p WHERE p.producent LIKE %:searchWord% OR p.name LIKE %:searchWord% or p.categoryModel.categoryName LIKE %:searchWord%")
    Page<ProductModel> findAllSortable(Pageable paging, String searchWord);

    @Query(value = "select product.producent, \n" +
            "COUNT(order_product.product_model_id)  as liczba\n" +
            "from product \n" +
            "LEFT JOIN order_product ON product.id = order_product.product_model_id\n" +
            "GROUP BY (product.producent)\n" +
            "ORDER BY liczba DESC\n" +
            "LIMIT 5", nativeQuery = true)
    List<Map<ProductModel,Long>> findMostOrderByProducents();

    @Query(value = "select product.*,AVG(opinions.rate) rate\n" +
            "from product\n" +
            "JOIN opinions ON product.id = opinions.product_model_id\n" +
            "GROUP BY (product.id)\n" +
            "ORDER BY rate DESC\n" +
            "LIMIT 8", nativeQuery = true)
    List<ProductModel> mostRatedProducts();

    @Query(value = "select product.* ,count(product.id) * order_product.quantity liczba \n" +
            "from product\n" +
            "JOIN order_product ON product.id = order_product.product_model_id \n" +
            "GROUP by product.id\n" +
            "ORDER BY liczba DESC\n" +
            "LIMIT 8", nativeQuery = true)
    List<ProductModel> mostOrderProduct();
}
