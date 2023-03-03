package computershop;

import com.fasterxml.jackson.databind.ObjectMapper;
import computershop.model.ProductModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ApplicationUnitTests {

    ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testAddProductStatus201() throws Exception {

        ProductModel productModel = new ProductModel();
        productModel.setProducent("Logitech");
        productModel.setPrice(255.0);
        productModel.setName("Logitech A-5");
        productModel.setSlider(false);
        productModel.setImage("zdjecie.jpg");
        productModel.setDescription("Poprawny opis przedmiotu");
        productModel.setQuantityAvailable(10);

        this.mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/products/1")
                        .content(this.objectMapper.writeValueAsString(productModel))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is(201));
    }


    @Test
    public void testAddProductStatus400() throws Exception {

        ProductModel productModel = new ProductModel();
        productModel.setProducent("Logitech");
        productModel.setPrice(-5.0);
        productModel.setName("Logitech A-5");
        productModel.setSlider(false);
        productModel.setImage("zdjecie.jpg");
        productModel.setDescription("Poprawny opis przedmiotu");
        productModel.setQuantityAvailable(-1);

        this.mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/products/1")
                        .content(this.objectMapper.writeValueAsString(productModel))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is(400))
                .andExpect(MockMvcResultMatchers.jsonPath("price").value("Wprowadź poprawną cenę"))
                .andExpect(MockMvcResultMatchers.jsonPath("quantityAvailable").value("Wprowadź poprawną ilość"));
    }

    @Test
    public void testDeleteProductStatus200() throws Exception {

        this.mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is(200));
    }

    @Test
    public void testDeleteProductStatus404() throws Exception {

        this.mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/products/50000")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is(404))
                .andExpect(MockMvcResultMatchers.content().string("Nie znaleziono rekordu o przekazanym identyfikatorze"));
    }

    @Test
    public void testUpdateProductStatus200() throws Exception {

        ProductModel productModel = new ProductModel();
        productModel.setProducent("Logitech");
        productModel.setPrice(255.0);
        productModel.setName("Logitech A-5");
        productModel.setSlider(false);
        productModel.setImage("zdjecie.jpg");
        productModel.setDescription("Poprawny opis przedmiotu");
        productModel.setQuantityAvailable(5);

        this.mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/products/2/1")
                        .content(this.objectMapper.writeValueAsString(productModel))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is(200));
    }

    @Test
    public void testUpdateProductStatus400() throws Exception {

        ProductModel productModel = new ProductModel();
        productModel.setPrice(255.0);
        productModel.setName("Logitech A-5");
        productModel.setSlider(false);
        productModel.setImage("zdjecie.jpg");
        productModel.setQuantityAvailable(5);

        this.mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/products/2/1")
                        .content(this.objectMapper.writeValueAsString(productModel))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is(400))
                .andExpect(MockMvcResultMatchers.jsonPath("producent").value("Wprowadź poprawnego producenta"));
    }

    @Test
    public void testUpdateProductStatus404() throws Exception {

        ProductModel productModel = new ProductModel();
        productModel.setProducent("Logitech");
        productModel.setPrice(255.0);
        productModel.setName("Logitech A-5");
        productModel.setSlider(false);
        productModel.setImage("zdjecie.jpg");
        productModel.setDescription("Poprawny opis przedmiotu");
        productModel.setQuantityAvailable(5);

        this.mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/products/1/35")
                        .content(this.objectMapper.writeValueAsString(productModel))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is(404))
                .andExpect(MockMvcResultMatchers.content().string("Nie znaleziono rekordu o przekazanym identyfikatorze"));
    }
}