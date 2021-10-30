package sydney.uni.edu.au.elec5619.MindPortal;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import sydney.uni.edu.au.elec5619.MindPortal.controllers.UsersController;
import sydney.uni.edu.au.elec5619.MindPortal.domain.RegisterResponse;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserRepository;

import java.util.HashMap;
import java.util.Map;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UserControllerTests {

    @MockBean
    UserRepository userRepo;

    @Autowired
    private UsersController usersController;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * Tests that a user can successfuly register
     *
     * @throws Exception
     */
    @Test
    public void testRegisterUser() throws Exception {
        // given
        Map<String, String> userToSend = new HashMap<>();
        userToSend.put("firstName", "John");
        userToSend.put("lastName", "Smith");
        userToSend.put("password", "Pass1234,");
        userToSend.put("email", "johnsmith12@organisation.com");

        String url = "http://localhost:8080/register";

        // when
        ResponseEntity<RegisterResponse> response = restTemplate.postForEntity(url, userToSend, RegisterResponse.class);

        // then
        Assertions.assertNotNull(response);
        Assertions.assertNotNull(response.getBody());
        Assertions.assertNotNull(response.getBody().getUser());
        User returnedUsr = response.getBody().getUser();
        Assertions.assertEquals("John", returnedUsr.getFirstName());
        Assertions.assertEquals("Smith", returnedUsr.getLastName());
        Assertions.assertEquals("johnsmith12@organisation.com", returnedUsr.getEmail());


        String token = response.getBody().getToken().get("token");
        Assertions.assertNotNull(token);
        int id = response.getBody().getUser().getId();
        cleanupUser(id, token);

    }

    /**
     * Tests attempting to register a user with a bad password
     */
    @Test
    private void testRegisterUserBadPassword() throws Exception{
        Map<String, String> userToSend = new HashMap<>();
        userToSend.put("firstName", "John");
        userToSend.put("lastName", "Smith");
        userToSend.put("password", "Pas");
        userToSend.put("email", "johnsmith11@organisation.com");

        String url = "http://localhost:8080/register";

        ResponseEntity<RegisterResponse> response = restTemplate.postForEntity(url, userToSend, RegisterResponse.class);

        Assertions.assertEquals(400, response.getStatusCode().value());

    }


    private void cleanupUser(int id, String token){
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        HttpEntity<?> entity = new HttpEntity<>(headers);
        headers.add("Authorization", "Bearer " + token);
        ResponseEntity<?> responseDel = restTemplate.exchange("http://localhost:8080/api/users/" + id, HttpMethod.DELETE,entity, String.class);
        System.out.println(responseDel.getStatusCode());
    }




}
