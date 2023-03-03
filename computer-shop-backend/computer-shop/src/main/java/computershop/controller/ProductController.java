package computershop.controller;

import computershop.dto.productModel.AddProductDto;
import computershop.dto.productModel.ProductCart;
import computershop.model.ProductModel;
import computershop.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProducts(@RequestParam Integer pageNumber, @RequestParam String searchWord){
        int pageSize = 8;
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts(pageNumber,pageSize,searchWord));
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity<Object> addProduct(@PathVariable Long categoryId, @RequestBody AddProductDto addProductDto){
        productService.addProduct(categoryId,addProductDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long productId){
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{productId}/{categoryId}")
    public ResponseEntity<Object> updateProduct(@PathVariable Long productId, @PathVariable Long categoryId, @RequestBody @Valid AddProductDto addProductDto){
        productService.updateProduct(productId, categoryId,addProductDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/filters/searchBarFilter")
    public ResponseEntity<List<ProductModel>> getSearchBarFilter(@RequestParam String searchWord){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getSearchBarFilter(searchWord));
    }

    @GetMapping("/specyfiction/{productId}")
    public ResponseEntity<Map<String, Object>> getProductSpecyfication(@PathVariable Long productId){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductSpecyfication(productId));
    }
    @GetMapping ("/filters/CategoryPageFilters")
    public ResponseEntity<Map<String, Object>> getProductFilter(@RequestParam List<String>categories, @RequestParam List<String> manufacturer,
                                                                        @RequestParam Double minPrice, @RequestParam Double maxPrice,
                                                                            @RequestParam Integer pageNumber){
         Integer pageSize = 12;
         return ResponseEntity.status(HttpStatus.OK).body(productService.getProductFilter(categories,manufacturer, minPrice, maxPrice, pageNumber,pageSize));
    }

    @GetMapping("/getAllProducents")
    public ResponseEntity<Set<String>> getAllProducents(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducents());
    }
    @GetMapping("/{productId}")
    public ResponseEntity<ProductModel> getProductById(@PathVariable Long productId){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductById(productId));
    }
    @GetMapping("/slider")
    public ResponseEntity<List<ProductModel>> productOnSlider(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.productOnSlider());
    }
    @GetMapping("/mostRatedProducts")
    public ResponseEntity<List<ProductModel>> productOnDiscount(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.mostRatedProduct());
    }
    @GetMapping("/mostOrderProduct")
    public ResponseEntity<List<ProductModel>> mostOrderProduct(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.mostOrderProduct());
    }
    @GetMapping("/recommendedProduct")
    public ResponseEntity<List<ProductModel>> recommendedProduct(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.recommendedProduct());
    }
    @GetMapping("/mostOrderdByProducents")
    public ResponseEntity<List<Map<ProductModel, Long>>> findMostOrderByProducents(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.findMostOrderByProducents());
    }
    @PostMapping("/getProductsInCart")
    public ResponseEntity<List<ProductModel>> getProductsInCart(@RequestBody List<ProductCart> productIds){
         return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsInCart(productIds));
    }
}