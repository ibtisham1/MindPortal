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
import sydney.uni.edu.au.elec5619.MindPortal.domain.QuestionnaireResponses;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.QuestionnaireResponsesRepository;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@AutoConfigureMockMvc
public class QuestionnaireResponseControllerTests {

    @Autowired
    UserRepository userRepo;

    @Autowired
    QuestionnaireResponsesRepository QRR;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MockMvc mockMvc2;

    private String token;
    private User testUser;

    private QuestionnaireResponses QR;


    /**
     * Tests that a questionnaire can be normally posted into the table as intended
     *
     * @throws Exception
     */
    @Test
    @Transactional
    public void testNormalInput() throws Exception {

        //initial setup
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

        //
        // given
        QuestionnaireResponses QR = new QuestionnaireResponses(1,"40",user);


        // when
        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest2 = MockMvcRequestBuilders.post("/questionnaireResponses")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(QR));

        System.out.println("Sending");

        // then
        mockMvc.perform(mockRequest2)
                .andExpect(status().is(201))
                .andExpect(jsonPath("$.questionnaireResponsesId", equalTo(1)))
                .andExpect(jsonPath("$.responses", equalTo("40")));
    }

    @Test
    @Transactional
    public void testStringResponse() throws Exception {

        //initial setup
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

        //
        // given
        QuestionnaireResponses QR = new QuestionnaireResponses(1,"stringResponse",user);


        // when
        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest2 = MockMvcRequestBuilders.post("/questionnaireResponses")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(QR));

        System.out.println("Sending");

        // then
        mockMvc.perform(mockRequest2)
                .andExpect(status().is(201))
                .andExpect(jsonPath("$.questionnaireResponsesId", equalTo(1)))
                .andExpect(jsonPath("$.responses", equalTo("stringResponse")));
    }
    @Test

    @Transactional
    public void getResponseTest() throws Exception {
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

        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest4 = MockMvcRequestBuilders.get("/questionnaireResponses/281")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc2.perform(mockRequest4)
                .andExpect(jsonPath("$.questionnaireResponsesId", equalTo(281)))
                .andExpect(jsonPath("$.responses", equalTo("20")));
    }
    @Test
    @Transactional
    public void getRepsonseInvalidID() throws Exception {
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

        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest4 = MockMvcRequestBuilders.get("/questionnaireResponses/apple")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc2.perform(mockRequest4)
                .andExpect(status().isBadRequest());
    }
    @Test
    @Transactional
    public void getRepsonseNonexistentID() throws Exception {
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

        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest4 = MockMvcRequestBuilders.get("/questionnaireResponses/600")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc2.perform(mockRequest4)
                .andExpect(status().is(400));
    }

    @Test
    @Transactional
    public void deletedResponseTest() throws Exception {
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

        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest4 = MockMvcRequestBuilders.delete("/questionnaireResponses/335")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc2.perform(mockRequest4)
                .andExpect(status().is(200));
    }




}
