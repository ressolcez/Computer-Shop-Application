package computershop.controller;

import computershop.dto.userModel.AddUserModelDto;
import computershop.dto.userModel.UpdateUserDataByUser;
import computershop.dto.userModel.UpdateUserPasswordDTO;
import computershop.model.UserModel;
import computershop.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public ResponseEntity<List<UserModel>> getAllUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @GetMapping("/Pageable")
    public ResponseEntity<Map<String, Object>> getAllUsersPageable(@RequestParam Integer pageNumber, @RequestParam String searchWord){
        int pageSize = 8;
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsersPageable(pageNumber,pageSize,searchWord));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserModel> getUserById(@PathVariable Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(userId));
    }

    @GetMapping("/validation/{email}")
    public ResponseEntity<Object> getUserByEmail(@PathVariable String email){
        userService.getUserByEmail(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/validation/login/{login}")
    public ResponseEntity<Object> getUserByLogin(@PathVariable String login){
        userService.getUserByLogin(login);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @PostMapping("/{rolesId}")
    public ResponseEntity<Object> addUser(@PathVariable Long rolesId, @Valid @RequestBody AddUserModelDto addUserModelDto){
        userService.addUser(addUserModelDto,rolesId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/updatePassword/{userId}")
    public ResponseEntity<Object> updateUserPassword(@PathVariable Long userId, @RequestBody UpdateUserPasswordDTO updateUserPasswordDTO){
        userService.updateUserPassword(userId,updateUserPasswordDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/changeLockAccount/{userId}")
    public ResponseEntity<Object> changeUserLockAccount(@PathVariable Long userId){
        userService.changeUserLockAccount(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/{rolesId}/{userId}")
    public ResponseEntity<Object> updateUser(@PathVariable Long rolesId, @PathVariable Long userId, @RequestBody @Valid AddUserModelDto userModelDto){
        userService.updateUser(userModelDto,rolesId,userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Object> changeUserDataByUser(@PathVariable Long userId, @RequestBody @Valid UpdateUserDataByUser updateUserData){
        userService.changeUserDataByUser(userId, updateUserData);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<Object> changeUserPassword(@PathVariable Long userId, @RequestParam String password){
        userService.changeUserPassword(userId,password);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
