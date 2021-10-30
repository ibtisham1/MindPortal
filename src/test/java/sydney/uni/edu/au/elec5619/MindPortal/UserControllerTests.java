package sydney.uni.edu.au.elec5619.MindPortal;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserRepository;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@AutoConfigureMockMvc
public class UserControllerTests {

    @Autowired
    UserRepository userRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;


    /**
     * Tests that a user can successfully register
     *
     * @throws Exception
     */
    @Test
    @Transactional
    public void testRegisterUser() throws Exception {
        // given
        User user = new User("John", "Smith", "johnsmith14@organisation.com", "Pass1234,");

        // when
        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user));

        System.out.println("Sending");
        System.out.println(objectMapper.writeValueAsString(user).toString());

        MvcResult result = mockMvc.perform(mockRequest).andReturn();
        MockHttpServletResponse re = result.getResponse();

        // then
        Assertions.assertThat(re.getStatus()).isEqualTo(HttpStatus.OK.value());
        // read the string and make other assertions.

        System.out.println("MOCK MVC RESPONSE");
        System.out.println(re.getContentAsString());


    }


    public void testRegisterUserBadPassword() {
        //
    }
//
//    /**
//     * Tests attempting to register a user with a bad password
//     */
//    @Test
//    public void testRegisterUserBadPassword() throws Exception{
//        Map<String, String> userToSend = new HashMap<>();
//        userToSend.put("firstName", "John");
//        userToSend.put("lastName", "Smith");
//        userToSend.put("password", "Pas");
//        userToSend.put("email", "johnsmith12@organisation.com");
//
//        String url = "http://localhost:8080/register";
//
//        ResponseEntity<String> response = restTemplate.postForEntity(url, userToSend, String.class);
//
//        Assertions.assertEquals(400, response.getStatusCode().value());
//
//    }


    public void testDeleteUser(){
        //
    }


    public void testUpdateUser(){
        //
    }

    public void testUpdateUserBad(){
        //
    }

    public void testGetAllUsers(){
        //
    }


    public void testCorrectHeaders(){
        // test that you need authorization for everything besides register/authentication (to do with users)
    }

//    private void cleanupUser(int id, String token){
//        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
//        HttpEntity<?> entity = new HttpEntity<>(headers);
//        headers.add("Authorization", "Bearer " + token);
//        ResponseEntity<?> responseDel = restTemplate.exchange("http://localhost:8080/api/users/" + id, HttpMethod.DELETE,entity, String.class);
//        System.out.println(responseDel.getStatusCode());
//    }




}
