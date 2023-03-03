package computershop;
import computershop.dto.productModel.AddProductDto;
import computershop.model.ProductModel;
import computershop.repository.ProductRepository;
import computershop.service.CategoryService;
import computershop.service.ProductService;
import computershop.validations.ValidationsFacade;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
public class ComputerShopApplicationTests {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryService categoryService;

    @Mock
    private ValidationsFacade validationsFacade;

    private AutoCloseable autoCloseable;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setup(){
        autoCloseable = MockitoAnnotations.openMocks(this);
        productService = new ProductService(productRepository,categoryService,validationsFacade);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void testAddProductSuccess(){

        //given
        AddProductDto addProductDto = AddProductDto.builder()
                .producent("Logitech")
                .price(1.0)
                .name("Logitech G-403")
                .slider(false)
                .image("myszka1.jpg")
                .description("Dzięki przemyślanej budowie waży jedynie 59 g, dzięki czemu Twoja dłoń nie męczy się podczas użytkowania.")
                .quantityAvailable(100)
                .build();

        ProductModel asd;
        //when
        asd = productService.addProduct(1L,addProductDto);
        //verify
        verify(productRepository,times(1)).save(asd);
    }
    @Test
    void testAddProductFailBadPrice(){

        //given
        AddProductDto addProductDto = AddProductDto.builder()
                .producent("Logitech")
                .price(-1.0)
                .name("Logitech G-403")
                .slider(false)
                .image("myszka1.jpg")
                .description("Dzięki przemyślanej budowie waży jedynie 59 g, dzięki czemu Twoja dłoń nie męczy się podczas użytkowania.")
                .quantityAvailable(100)
                .build();

        ProductModel asd;
        asd = productService.addProduct(1L,addProductDto);
    }
}
