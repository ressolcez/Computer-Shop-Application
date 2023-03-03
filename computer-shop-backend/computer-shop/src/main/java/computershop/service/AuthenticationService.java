package computershop.service;
import computershop.dto.auth.AuthenticationResponse;
import computershop.dto.auth.Credentials;
import computershop.model.RolesModel;
import computershop.model.UserModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AuthenticationService {
    private final UserService userService;
    private final Map<String, UserModel> authenticatedUsersMap;
    private final Map<String, Object> authResponse;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserService userService, PasswordEncoder passwordEncoder) {
        this.authenticatedUsersMap = new HashMap<>();
        this.authResponse = new HashMap<>();
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    public AuthenticationResponse authenticate(Credentials credentials) {
        String username = credentials.getLogin();
        String password = credentials.getPassword();

        UserModel userModel;

        try {
            userModel = userService.getUserByCredentials(username).orElseThrow();
        }catch (NoSuchElementException e){
            return new AuthenticationResponse("-1");
        }

        System.out.println(userModel.getLocked());

        boolean matches = passwordEncoder.matches(password, userModel.getPassword());

        if(!matches){
            return new AuthenticationResponse("-1");
        }

        if(userModel.getLocked()){
            return new AuthenticationResponse("0");
        }

        UUID uuid = UUID.randomUUID();
        String token = uuid.toString();
        this.authenticatedUsersMap.put(token, userModel);

        return new AuthenticationResponse(token);
    }

    public int getUsersMapSize(){
        return this.authenticatedUsersMap.size();
    }

    public boolean logoutUser(AuthenticationResponse authenticationResponse){
        this.authenticatedUsersMap.remove(authenticationResponse.getToken());
        return true;
    }

    public void deleteUserToken(Long userId){
        for (Map.Entry<String, UserModel> entry : this.authenticatedUsersMap.entrySet()) {
            if(Objects.equals(entry.getValue().getId(), userId)){
                this.authenticatedUsersMap.remove(entry.getKey());
            }
        }
    }

    public ResponseEntity<Object> isAuthorized(String token) {

        if (this.authenticatedUsersMap.containsKey(token)) {
            UserModel userModel;
            userModel = authenticatedUsersMap.get(token);
            RolesModel rolesModel;
            rolesModel = userModel.getRolesModel();
            this.authResponse.put("user_Id",userModel.getId());
            this.authResponse.put("role", rolesModel.getName());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.authResponse);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
