package sydney.uni.edu.au.elec5619.MindPortal.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Map;

/**
 * The RegisterResponse class is responsible for the response to the frontend with a user and token object.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class RegisterResponse {

    User user;
    Map<String, String> token;

    public RegisterResponse() {
    }

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
