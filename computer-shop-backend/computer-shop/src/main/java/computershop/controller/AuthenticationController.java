package computershop.controller;

import computershop.dto.auth.AuthenticationResponse;
import computershop.dto.auth.Credentials;
import computershop.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/authentication")
@CrossOrigin("*")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody Credentials credentials) {
        return ResponseEntity.status(HttpStatus.OK).body(this.authenticationService.authenticate(credentials));
    }

    @PostMapping("/logout")
    public ResponseEntity<Boolean> logutUser(@RequestBody AuthenticationResponse authenticationResponse) {
        boolean isLogout = this.authenticationService.logoutUser(authenticationResponse);
        return ResponseEntity.status(HttpStatus.OK).body(isLogout);
    }
    @GetMapping
    public ResponseEntity<Object> userAuthorization(@RequestHeader("Authorization") String token) {
        return authenticationService.isAuthorized(token);



    }
    @PostMapping("/deleteToken/{userId}")
    public void deleteUserToken(@PathVariable Long userId){
        authenticationService.deleteUserToken(userId);
    }
}
