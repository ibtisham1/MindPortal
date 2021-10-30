package sydney.uni.edu.au.elec5619.MindPortal;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserRepository;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


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

        // then
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.firstName", equalTo("John")))
                .andExpect(jsonPath("$.user.lastName", equalTo("Smith")))
                .andExpect(jsonPath("$.user.email", equalTo("johnsmith14@organisation.com")));

    }


    /**
     * Tests registering a user with an insufficient password strength.
     * @throws Exception
     */
    @Test
    @Transactional
    public void testRegisterUserBadPassword() throws Exception {

        // given
        User user = new User("John", "Smith", "johnsmith14@organisation.com", "Pass");

        // when
        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user));
        // then
        MvcResult result = mockMvc.perform(mockRequest)
                .andExpect(status().isBadRequest())
                .andReturn();

        String response = result.getResponse().getContentAsString();

        assertEquals(response, "insufficient password strength");
    }



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
