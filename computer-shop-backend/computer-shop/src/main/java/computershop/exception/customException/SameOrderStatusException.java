package computershop.exception.customException;

public class SameOrderStatusException extends RuntimeException {
    public SameOrderStatusException() {
        super();
    }
    public SameOrderStatusException(String message, Throwable cause) {
        super(message, cause);
    }
    public SameOrderStatusException(String message) {
        super(message);
    }
    public SameOrderStatusException(Throwable cause) {
        super(cause);
    }
}
