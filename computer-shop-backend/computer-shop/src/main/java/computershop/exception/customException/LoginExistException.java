package computershop.exception.customException;

public class LoginExistException extends RuntimeException {
    public LoginExistException() {
        super();
    }
    public LoginExistException(String message, Throwable cause) {
        super(message, cause);
    }
    public LoginExistException(String message) {
        super(message);
    }
    public LoginExistException(Throwable cause) {
        super(cause);
    }
}

