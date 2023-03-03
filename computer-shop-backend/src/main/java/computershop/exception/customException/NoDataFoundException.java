package computershop.exception.customException;

public class NoDataFoundException extends RuntimeException{

    public NoDataFoundException() {
        super();
    }
    public NoDataFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    public NoDataFoundException(String message) {
        super(message);
    }
    public NoDataFoundException(Throwable cause) {
        super(cause);
    }
}

