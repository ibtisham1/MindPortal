package sydney.uni.edu.au.elec5619.MindPortal.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message) {
        super(message);
    }
}
