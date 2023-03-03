package computershop.service;

import computershop.dto.productModel.AddProductDto;
import computershop.dto.productModel.ProductCart;
import computershop.exception.customException.NoDataFoundException;
import computershop.model.CategoryModel;
import computershop.model.ProductModel;
import computershop.repository.ProductRepository;
import computershop.validations.ValidationsFacade;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final Map<String, Object> pageableProducts;
    private final ValidationsFacade validationsFacade;
    private Page<ProductModel> pagedResult;

    public ProductService(ProductRepository productRepository, CategoryService categoryService, ValidationsFacade validationsFacade){
        this.pageableProducts = new HashMap<>();
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.validationsFacade = validationsFacade;
    }

    public Map<String, Object> getAllProducts(Integer pageNumber, Integer pageSize, String searchWord) throws DataAccessException {
        Pageable paging = PageRequest.of(pageNumber, pageSize);
        this.pagedResult = productRepository.findAllSortable(paging,searchWord);
        this.pageableProducts.put("products", this.pagedResult.getContent());
        this.pageableProducts.put("totalPages", this.pagedResult.getTotalPages());
        this.pageableProducts.put("rowCount", pagedResult.getTotalElements());
        return this.pageableProducts;
    }

    public ProductModel getProductById(Long productId){
        return productRepository.findById(productId).orElseThrow(NoDataFoundException::new);
    }

    public Map <String, Object> getProductSpecyfication(Long productId){
        ProductModel productModel = productRepository.findById(productId).orElseThrow(NoDataFoundException::new);

        Map<String, Object> productSpecyfication = new HashMap<>();
        productSpecyfication.put("product", productModel);

        return productSpecyfication;
    }

    public ProductModel addProduct(Long categoryId,AddProductDto addProductDto){

        validationsFacade.validate(addProductDto);

        CategoryModel categoryModel = categoryService.getCategoryById(categoryId);
        ProductModel productModel = new ProductModel();
        productModel.setProducent(addProductDto.getProducent());
        productModel.setPrice(addProductDto.getPrice());
        productModel.setName(addProductDto.getName());
        productModel.setSlider(addProductDto.getSlider());
        productModel.setImage(addProductDto.getImage());
        productModel.setDescription(addProductDto.getDescription());
        productModel.setQuantityAvailable(addProductDto.getQuantityAvailable());
        productModel.setCategoryModel(categoryModel);

        productRepository.save(productModel);

        return productModel;
    }

    public void deleteProduct(Long productId) throws EmptyResultDataAccessException {

        productRepository.deleteById(productId);

    }

    public List<ProductModel> productOnSlider(){
        Boolean state = true;
        return productRepository.findBySlider(state);
    }

    public List<ProductModel> mostOrderProduct() {
        return productRepository.mostOrderProduct();
    }

    public List<ProductModel> recommendedProduct(){
        return productRepository.findBySlider(false);
    }

    public Map<String,Object> getProductFilter(List<String> categories, List<String> manufacturer, Double minPrice,
                                                Double maxPrice, Integer pageNumber, Integer pageSize){

        Pageable paging = PageRequest.of(pageNumber, pageSize);

        if(categories.size() == 0 && manufacturer.size() == 0){
            this.pagedResult = productRepository.findByPriceBetween(minPrice,maxPrice,paging);

        }else if(manufacturer.size() == 0) {
            this.pagedResult = productRepository.findByCategoryModelCategoryNameAndPriceBetween(categories,minPrice,maxPrice, paging);

        }else if(categories.size() == 0){
            this.pagedResult = productRepository.findByProducentInBetweenPrice(manufacturer,minPrice,maxPrice,paging);

        }else{
            this.pagedResult = productRepository.findByProducentIn_OrCategoryModel_NameInBetweenPrice(categories,minPrice,maxPrice,manufacturer,paging);
        }

        this.pageableProducts.put("products", this.pagedResult.getContent());
        this.pageableProducts.put("totalPages", this.pagedResult.getTotalPages());

        return this.pageableProducts;
    }

    public List<ProductModel> getSearchBarFilter(String searchWord){
        if(searchWord.isBlank()){
            return Collections.emptyList();
        }
        return productRepository.findByNameOrProducentOrCategoryModelName(searchWord);
    }

    public void updateProduct(Long productId, Long categoryId,AddProductDto addProductDto){

        validationsFacade.validate(addProductDto);

        ProductModel productModel = this.getProductById(productId);
        CategoryModel categoryModel = categoryService.getCategoryById(categoryId);

        productModel.setProducent(addProductDto.getProducent());
        productModel.setPrice(addProductDto.getPrice());
        productModel.setImage(addProductDto.getImage());
        productModel.setName(addProductDto.getName());
        productModel.setSlider(addProductDto.getSlider());
        productModel.setDescription(addProductDto.getDescription());
        productModel.setCategoryModel(categoryModel);
        productModel.setQuantityAvailable(addProductDto.getQuantityAvailable());
        productRepository.save(productModel);
    }

    public List<Map<ProductModel, Long>> findMostOrderByProducents(){
        return productRepository.findMostOrderByProducents();
    }

    public Set<String> getAllProducents() throws DataAccessException{
        List<ProductModel> productModels = productRepository.findAll();
        Set<String> producentsSet = new HashSet<>();

        for (ProductModel productModel : productModels) {
            producentsSet.add(productModel.getProducent());
        }
        return producentsSet;
    }

    public List<ProductModel> mostRatedProduct(){
        return productRepository.mostRatedProducts();
    }

    public List<ProductModel> getProductsInCart(List<ProductCart> productIds){
        List<ProductModel> productModels = new ArrayList<>();
        productIds.forEach((n) -> productModels.add(productRepository.findById(n.getId()).orElseThrow(NoDataFoundException::new)));
        return productModels;
    }
}