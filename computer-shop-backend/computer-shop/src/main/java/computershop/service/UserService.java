package computershop.service;

import computershop.dto.userModel.AddUserModelDto;
import computershop.dto.userModel.UpdateUserDataByUser;
import computershop.dto.userModel.UpdateUserPasswordDTO;
import computershop.exception.customException.EmailExistException;
import computershop.exception.customException.LoginExistException;
import computershop.exception.customException.NoDataFoundException;
import computershop.model.RolesModel;
import computershop.model.UserModel;
import computershop.repository.UserRepository;
import computershop.validations.ValidationsFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.*;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RolesService rolesService;
    private final PasswordEncoder passwordEncoder;
    private final Map<String, Object> pageableUsers;

    private final ValidationsFacade validationsFacade;
    public UserService(PasswordEncoder passwordEncoder, RolesService rolesService, UserRepository userRepository, ValidationsFacade validationsFacade){
        this.pageableUsers = new HashMap<>();
        this.passwordEncoder = passwordEncoder;
        this.rolesService = rolesService;
        this.userRepository = userRepository;
        this.validationsFacade = validationsFacade;
    }

    public List<UserModel> getAllUsers() throws DataAccessException {
        return userRepository.findAll();
    }

    public UserModel getUserById(Long userId){
        return userRepository.findById(userId).orElseThrow(NoDataFoundException::new);
    }

    public void addUser(AddUserModelDto addUserModelDto, Long rolesId){

            validationsFacade.validate(addUserModelDto);

            this.getUserByLogin(addUserModelDto.getLogin());
            this.getUserByEmail(addUserModelDto.getEmail());

            RolesModel rolesModel = rolesService.getRolesById(rolesId);

            UserModel userModel = new UserModel();
            userModel.setName(addUserModelDto.getName());
            userModel.setLogin(addUserModelDto.getLogin());
            userModel.setEmail(addUserModelDto.getEmail());
            userModel.setAddress(addUserModelDto.getAddress());
            userModel.setSurname(addUserModelDto.getSurname());
            userModel.setHouseNumber(addUserModelDto.getHouseNumber());
            userModel.setPostalCode(addUserModelDto.getPostalCode());
            userModel.setPassword(passwordEncoder.encode(addUserModelDto.getPassword()));
            userModel.setLocked(false);
            userModel.setRolesModel(rolesModel);
            userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));
            userModel.setRolesModel(rolesModel);

            System.out.println(addUserModelDto.getHouseNumber());

            userRepository.save(userModel);

    }
    public void deleteUser(Long userId) throws EmptyResultDataAccessException {
        userRepository.deleteById(userId);
    }
    public Optional<UserModel> getUserByCredentials(String login){
        return userRepository.getUserByCredential(login);
    }

    public void updateUser(AddUserModelDto userModeldto, Long rolesId, Long userId){

        validationsFacade.validate(userModeldto);

        RolesModel rolesModel = rolesService.getRolesById(rolesId);
        UserModel userModel = this.getUserById(userId);

        if(!userModeldto.getEmail().equals(userModel.getEmail())){
            this.getUserByEmail(userModeldto.getEmail());
        }

        if(!userModeldto.getLogin().equals(userModel.getLogin())){
            this.getUserByLogin(userModeldto.getLogin());
        }

        userModel.setName(userModeldto.getName());
        userModel.setLogin(userModeldto.getLogin());
        userModel.setEmail(userModeldto.getEmail());
        userModel.setAddress(userModeldto.getAddress());
        userModel.setSurname(userModeldto.getSurname());
        userModel.setPassword(passwordEncoder.encode(userModeldto.getPassword()));
        userModel.setHouseNumber(userModeldto.getHouseNumber());
        userModel.setPostalCode(userModeldto.getPostalCode());
        userModel.setRolesModel(rolesModel);
        userRepository.save(userModel);
    }

    public void getUserByEmail(String email) {
        if(userRepository.existsByEmail(email)){
            throw new EmailExistException("Ten adres e-mail jest już zajęty");
        }
    }

    public void getUserByLogin(String login) {
        if(userRepository.existsByLogin(login)){
            throw new LoginExistException("Ten login jest już zajęty");
        }
    }

    public void changeUserDataByUser(Long userId,UpdateUserDataByUser updateUserData){

        validationsFacade.validate(updateUserData);


        UserModel userModel = this.getUserById(userId);
        userModel.setPostalCode(updateUserData.getPostalCode());
        userModel.setSurname(updateUserData.getSurname());
        userModel.setAddress(updateUserData.getAddress());
        userModel.setName(updateUserData.getName());
        userModel.setHouseNumber(updateUserData.getHouseNumber());
        userRepository.save(userModel);
    }

    public void changeUserPassword(Long userId, String password){
        UserModel userModel = userRepository.findById(userId).orElseThrow(NoDataFoundException::new);
        userModel.setPassword(passwordEncoder.encode(password));
        userRepository.save(userModel);
    }

    public void updateUserPassword(Long userId,UpdateUserPasswordDTO updateUserPasswordDTO){

        validationsFacade.validate(updateUserPasswordDTO);

        UserModel userModel = this.getUserById(userId);
        userModel.setPassword(passwordEncoder.encode(updateUserPasswordDTO.getPassword()));
        userRepository.save(userModel);
    }

    public Map<String, Object> getAllUsersPageable(Integer pageNumber, int pageSize, String searchWord){
        Pageable paging = PageRequest.of(pageNumber, pageSize);
        Page<UserModel> pagedResult = userRepository.findAllFilterable(paging,searchWord);
        this.pageableUsers.put("users", pagedResult.getContent());
        this.pageableUsers.put("totalPages", pagedResult.getTotalPages());
        this.pageableUsers.put("rowCount", pagedResult.getTotalElements());
        return this.pageableUsers;
    }

    public void changeUserLockAccount(Long userId) {
        UserModel userModel = this.getUserById(userId);

        if(userModel.getLocked()){
            userModel.setLocked(false);
            userRepository.save(userModel);
        }else{
            userModel.setLocked(true);
            userRepository.save(userModel);
        }
    }
}
