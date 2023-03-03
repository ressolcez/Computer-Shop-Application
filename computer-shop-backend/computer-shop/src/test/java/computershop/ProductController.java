package computershop;

import computershop.model.ProductModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductController {

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    int randomServerPort;

    /*
    @Test
    void index() throws Exception {
        this.mockMvc
                .perform(get("/api/opinion?pageNumber=0"))
                .andExpect(status().isOk());
    }

     */

    @Test
    void testAddProductSuccess() throws Exception{

        final String baseUrl = "http://localhost:"+randomServerPort+"/api/products/1";
        URI uri = new URI(baseUrl);

        ProductModel productModel = new ProductModel();
        productModel.setProducent("Logitech");
        productModel.setPrice(255.5);
        productModel.setName("Logitech G-403");
        productModel.setSlider(false);
        productModel.setImage("myszka1.jpg");
        productModel.setDescription("Dzięki przemyślanej budowie waży jedynie 59 g, dzięki czemu Twoja dłoń nie męczy się podczas użytkowania.");
        productModel.setQuantityAvailable(100);

        HttpEntity<ProductModel> request = new HttpEntity<>(productModel);
        ResponseEntity<String> result = this.restTemplate.postForEntity(uri, request, String.class);

        assertEquals(200, result.getStatusCodeValue());

    }

    @Test
    void testAddProductFailBadCategory() throws Exception{

        final String baseUrl = "http://localhost:"+randomServerPort+"/api/products/25";
        URI uri = new URI(baseUrl);

        ProductModel productModel = new ProductModel();
        productModel.setProducent("Logitech");
        productModel.setPrice(255.5);
        productModel.setName("Logitech G-403");
        productModel.setSlider(false);
        productModel.setImage("myszka1.jpg");
        productModel.setDescription("Dzięki przemyślanej budowie waży jedynie 59 g, dzięki czemu Twoja dłoń nie męczy się podczas użytkowania.");
        productModel.setQuantityAvailable(100);

        HttpEntity<ProductModel> request = new HttpEntity<>(productModel);
        ResponseEntity<String> result = this.restTemplate.postForEntity(uri, request, String.class);

        assertEquals(500, result.getStatusCodeValue());
        assertTrue(Objects.requireNonNull(result.getBody()).contains("Nie znaleziono podanego rekordu"));
    }

    @Test
    void testAddProductFailBadPrice() throws Exception{

        String expectedResponse = "{\"price\":\"Wprowadź poprawną cenę\"}";

        final String baseUrl = "http://localhost:"+randomServerPort+"/api/products/1";
        URI uri = new URI(baseUrl);

        ProductModel productModel = new ProductModel();
        productModel.setProducent("Logitech");
        productModel.setPrice(-1.0);
        productModel.setName("Logitech A-5");
        productModel.setSlider(false);
        productModel.setImage("zdjecie.jpg");
        productModel.setDescription("Poprawny opis przedmiotu");
        productModel.setQuantityAvailable(25);

        HttpEntity<ProductModel> request = new HttpEntity<>(productModel);
        ResponseEntity<String> result = this.restTemplate.postForEntity(uri, request, String.class);

        assertEquals(400, result.getStatusCodeValue());
        assertEquals(expectedResponse,result.getBody());

    }
}
