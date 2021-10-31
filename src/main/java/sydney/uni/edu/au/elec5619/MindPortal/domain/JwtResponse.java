package sydney.uni.edu.au.elec5619.MindPortal.domain;

import java.io.Serializable;

/**
 * JwtResponse is used for the purposes of generating a JWT token.
 */
public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;


    private final String jwttoken;

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }


}
