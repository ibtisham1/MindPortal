package sydney.uni.edu.au.elec5619.MindPortal;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeEach;
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
import sydney.uni.edu.au.elec5619.MindPortal.domain.PasswordChangeRequest;
import sydney.uni.edu.au.elec5619.MindPortal.domain.RegisterResponse;
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

    private String token;
    private User testUser;


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
     *
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


    /**
     * Tests a well constructed request to delete a user.
     *
     * @throws Exception
     */
    @Test
    @Transactional
    public void testDeleteUser() throws Exception {
        int id = testUser.getId();
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.delete("/api/users/" + id)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk());

    }

    /**
     * Tests updating a user with good construction.
     *
     * @throws Exception
     */
    @Test
    @Transactional
    public void testUpdateUser() throws Exception {
        // given
        testUser.setLastName("Smooth");

        // when
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("/api/users")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testUser));

        // then
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.lastName", equalTo("Smooth")));

    }

    public void testUpdateUserBad() {
        //
    }

    /**
     * Tests that the user can correctly get all users if needed.
     * @throws Exception
     */
    @Test
    @Transactional
    public void testGetAllUsers() throws Exception{
        // given
        // when
        objectMapper.enable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.get("/api/users")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);
        // then
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk());
        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);


    }


    @Test
    @Transactional
    public void testGetUserById() throws Exception{
        // given
        int id = testUser.getId();

        // when
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.get("/api/users/"+id)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        // then
        mockMvc.perform(mockRequest)
                .andExpect(status().isOk());


    }


    @Test
    @Transactional
    public void testChangePassword() throws Exception {
        int id = testUser.getId();

        PasswordChangeRequest passwordChangeRequest = new PasswordChangeRequest("Pass1234,", "Pass5678,");

        // when
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.put("/api/users/"+id+"/changePassword")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(passwordChangeRequest));

        // then
        MvcResult result = mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andReturn();
    }


    @BeforeEach
    @Transactional
    public void setupUserToken() throws Exception {
        // given
        User user = new User("John", "Smith", "johnsmith15@organisation.com", "Pass1234,");

        // when
        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user));

        System.out.println("Sending");
        System.out.println(objectMapper.writeValueAsString(user).toString());

        // then
        MvcResult result = mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString();

        RegisterResponse registerResponse = objectMapper.readValue(response, RegisterResponse.class);
        this.testUser = registerResponse.getUser();
        String tk = JsonPath.parse(response).read("$.token.token");
        this.token = tk;
        System.out.println(tk);
    }

//    @AfterEach
//    public void deleteTestUser() throws Exception {
//
//        int id = testUser.getId();
//        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.delete("/api/users/"+id)
//                .header("Authorization", "Bearer " + token)
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON);
//
//        // delete user if stil present otherwise ignore
//        mockMvc.perform(mockRequest);
//    }


}
