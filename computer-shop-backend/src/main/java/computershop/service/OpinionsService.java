package computershop.service;
import computershop.dto.opinionsModel.AddOpinionsDto;
import computershop.dto.opinionsModel.EditOpinionsModelDto;
import computershop.dto.opinionsModel.OpinionsToProductSummary;
import computershop.exception.customException.NoDataFoundException;
import computershop.model.OpinionsModel;
import computershop.model.ProductModel;
import computershop.model.UserModel;
import computershop.repository.OpinionsRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class OpinionsService{
    private final OpinionsRepository opinionsRepository;
    private final ProductService productService;
    private final Map<String, Object> pageableOpinions;
    private final UserService userService;
    private Page<OpinionsModel> pagedResult;
    private final Validator validator;
    public OpinionsService(OpinionsRepository opinionsRepository, ProductService productService, UserService userService, Validator validator){
        this.pageableOpinions = new HashMap<>();
        this.opinionsRepository = opinionsRepository;
        this.productService = productService;
        this.userService = userService;
        this.validator = validator;
    }

    public void addOpinion(AddOpinionsDto addOpinionsDto, Long productId, Long userId)  throws DataAccessException {

        Set<ConstraintViolation<AddOpinionsDto>> violations = validator.validate(addOpinionsDto);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        ProductModel productModel = productService.getProductById(productId);
        UserModel userModel = userService.getUserById(userId);
        OpinionsModel opinionsModel = new OpinionsModel();
        opinionsModel.setComment(addOpinionsDto.getComment());
        opinionsModel.setRate(addOpinionsDto.getRate());
        opinionsModel.setProductModel(productModel);
        opinionsModel.setUserModel(userModel);
        opinionsRepository.save(opinionsModel);
    }

    public void deleteOpinion(Long opinionId) throws EmptyResultDataAccessException {
        opinionsRepository.deleteById(opinionId);
    }

    public Map<String, Object> getAllOpinions(Integer pageNumber, int pageSize){
        Pageable paging = PageRequest.of(pageNumber, pageSize);
        this.pagedResult = opinionsRepository.findAll(paging);
        this.pageableOpinions.put("opinions", this.pagedResult.getContent());
        this.pageableOpinions.put("totalPages", this.pagedResult.getTotalPages());
        this.pageableOpinions.put("rowCount", pagedResult.getTotalElements());
        return this.pageableOpinions;
    }

    public Map<String,Object> getOpinionToProduct(Long productId, Integer pageNumber){
        Pageable paging = PageRequest.of(pageNumber, 5);
        this.pagedResult = opinionsRepository.getOpinionToProduct(productId,paging);
        this.pageableOpinions.put("opinions", pagedResult.getContent());
        this.pageableOpinions.put("totalPages", pagedResult.getTotalPages());
        return this.pageableOpinions;
    }

    public OpinionsToProductSummary getProductRatingSummary(Long productId){

        List<OpinionsModel> listOfOpinion =
                this.opinionsRepository.findOpinionsModelByProductModel(productId);

        final int numberOfOpinions = listOfOpinion.size();
        double rate = 0;

        for (OpinionsModel opinionsModel : listOfOpinion) {
            rate += opinionsModel.getRate();
        }
        return new OpinionsToProductSummary
                (Math.round(rate / numberOfOpinions * 10.0) / 10.0
                        ,numberOfOpinions);
    }

        public void editOpinion(EditOpinionsModelDto editOpinionsModelDto){

        Set<ConstraintViolation<EditOpinionsModelDto>> violations = validator.validate(editOpinionsModelDto);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        OpinionsModel opinionsModel = opinionsRepository.findById(editOpinionsModelDto.getId()).orElseThrow(NoDataFoundException::new);
        opinionsModel.setComment(editOpinionsModelDto.getComment());
        opinionsModel.setRate(editOpinionsModelDto.getRate());
        opinionsRepository.save(opinionsModel);
    }
}