package computershop.service;

import computershop.exception.customException.NoDataFoundException;
import computershop.model.RolesModel;
import computershop.repository.RolesRepository;
import org.springframework.stereotype.Service;


@Service
public class RolesService {

    private final RolesRepository rolesRepository;

    public RolesService(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    public RolesModel getRolesById(Long rolesId){
        return rolesRepository.findById(rolesId).orElseThrow(NoDataFoundException::new);
    }

}
