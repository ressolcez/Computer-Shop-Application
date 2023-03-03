package computershop.exception.exceptionHandlers;

import computershop.exception.customException.EmailExistException;
import computershop.exception.customException.LoginExistException;
import computershop.exception.customException.NoDataFoundException;
import computershop.exception.customException.SameOrderStatusException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.StreamSupport;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = {EmptyResultDataAccessException.class})
    public ResponseEntity<Object> handleInvalidDelete() {
        return new ResponseEntity<>("Nie znaleziono rekordu o przekazanym identyfikatorze", HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(value = {EntityNotFoundException.class})
    public ResponseEntity<Object> handleInvalidPut() {
        return new ResponseEntity<>("Nie znaleziono rekordu o przekazanym identyfikatorze", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(value = {DataAccessException.class})
    public ResponseEntity<Object> handleInvalidSave(DataAccessException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {EmailExistException.class})
    public ResponseEntity<Object> handleSameMail(EmailExistException exception) {
        Map<String,String> errors = new HashMap<>();
        errors.put("email",exception.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = {NoDataFoundException.class})
    public ResponseEntity<Object> handleNoDataFound() {
        return new ResponseEntity<>("Nie znaleziono rekordu o przekazanym identyfikatorze", HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(value = {LoginExistException.class})
    public ResponseEntity<Object> handleSameLogin(LoginExistException exception) {
        Map<String,String> errors = new HashMap<>();
        errors.put("login",exception.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(value = {SameOrderStatusException.class})
    public ResponseEntity<Object> handleSameNameException(SameOrderStatusException exception) {
        Map<String,String> errors = new HashMap<>();
        errors.put("status",exception.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {IllegalStateException.class})
    public ResponseEntity<Object> handleIllegalStateException() {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    ResponseEntity<HashMap<String,String>> handleConstraintViolation(ConstraintViolationException ex) {

        HashMap<String,String> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.put(String.valueOf(StreamSupport.stream(violation.getPropertyPath().spliterator(), false).reduce((first, second) -> second).orElse(null)),violation.getMessage());
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);

    }
}
