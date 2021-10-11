package sydney.uni.edu.au.elec5619.MindPortal.exceptions;

public class CovidNotFoundException extends RuntimeException{
    public CovidNotFoundException(String message) {
        super(message);
    }
}
