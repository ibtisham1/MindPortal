package sydney.uni.edu.au.elec5619.MindPortal.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RegisterResponse {

    User user;
//    JwtResponse token;
    Map<String, String> token;

    public RegisterResponse(){}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Map<String, String> getToken() {
        return token;
    }

    public void setToken(Map<String, String> token) {
        this.token = token;
    }
}
