package computershop.controller;

import computershop.dto.opinionsModel.AddOpinionsDto;
import computershop.dto.opinionsModel.EditOpinionsModelDto;
import computershop.dto.opinionsModel.OpinionsToProductSummary;
import computershop.service.OpinionsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/opinion")
public class OpinionsController {
    private final OpinionsService opinionsService;
    public OpinionsController(OpinionsService opinionsService) {
        this.opinionsService = opinionsService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllOpinions(@RequestParam Integer pageNumber){
        int pageSize = 8;
        return ResponseEntity.status(HttpStatus.OK).body(opinionsService.getAllOpinions(pageNumber,pageSize));
    }

    @GetMapping("/opinionsToProduct/{productId}/{pageNumber}")
    public ResponseEntity<Map<String, Object>> getOpinionToProduct(@PathVariable Long productId, @PathVariable Integer pageNumber){
        return ResponseEntity.status(HttpStatus.OK).body(opinionsService.getOpinionToProduct(productId,pageNumber));
    }

    @GetMapping("/opinionsToProduct/rate/{productId}")
    public ResponseEntity<OpinionsToProductSummary> getProductWithRating(@PathVariable Long productId){
        return ResponseEntity.status(HttpStatus.OK).body(opinionsService.getProductRatingSummary(productId));
    }

    @PostMapping("/{productId}/{userId}")
    public ResponseEntity<Object> addOpinion(@RequestBody @Valid AddOpinionsDto addOpinionsDto, @PathVariable Long productId, @PathVariable Long userId){
        opinionsService.addOpinion(addOpinionsDto,productId,userId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Object> editOpinion(@RequestBody @Valid EditOpinionsModelDto editOpinionsModelDto){
        opinionsService.editOpinion(editOpinionsModelDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/{opinionId}")
    public ResponseEntity<Object> deleteOpinion(@PathVariable Long opinionId){
        opinionsService.deleteOpinion(opinionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
