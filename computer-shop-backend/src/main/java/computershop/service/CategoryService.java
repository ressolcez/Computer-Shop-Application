package computershop.service;


import computershop.exception.customException.NoDataFoundException;
import computershop.model.CategoryModel;
import computershop.repository.CategoryRespository;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class CategoryService {
    private final CategoryRespository categoryRespository;

    public CategoryService(CategoryRespository categoryRespository) {
        this.categoryRespository = categoryRespository;
    }

    public CategoryModel getCategoryById(Long categoryId){
        return categoryRespository.findById(categoryId).orElseThrow(NoDataFoundException::new);
    }

    public List<Map<CategoryModel, Long>> getSalesByCategory() throws DataAccessException {
        return categoryRespository.findSalesByCategory();
    }

    public Set<String> getAllCategoryName() throws DataAccessException {
        List<CategoryModel> categoryModels = categoryRespository.findAll();
        Set<String> categorySet = new HashSet<>();

        for (CategoryModel categoryModel : categoryModels) {
            categorySet.add(categoryModel.getCategoryName());
        }

        return categorySet;
    }
}
