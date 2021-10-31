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
import sydney.uni.edu.au.elec5619.MindPortal.domain.Diagnosis;
import sydney.uni.edu.au.elec5619.MindPortal.domain.DiagnosisResponse;
import sydney.uni.edu.au.elec5619.MindPortal.domain.RegisterResponse;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.DiagnosisRepository;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * UserControllerTests tests the functionality of the
 * {@link sydney.uni.edu.au.elec5619.MindPortal.controllers.DiagnosisController} class.
 */

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@AutoConfigureMockMvc
public class DiagnosisControllerTest {

    @Autowired
    DiagnosisRepository diagnosisRepository;

    @Autowired
    private ObjectMapper objectMapper;


    @Autowired
    private MockMvc mockMvc;

    private String token;
    private User testUser;
    private Diagnosis testDiagnosis;

    /**
     * Sets up a user for testing purposes. Needs to be refreshed to avoid duplicate user error.
     *
     * @throws Exception
     */
    @BeforeEach
    @Transactional
    public void setupUserToken() throws Exception {
        // given
        User user = new User("John", "Smith", "johnsmith15@organisation.com", "Pass1234,");
        Diagnosis diagnosis = new Diagnosis(34, "Severe");

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
        this.testDiagnosis = diagnosis;
        String tk = JsonPath.parse(response).read("$.token.token");
        this.token = tk;
        System.out.println(tk);
    }


    /**
     * Tests that the user can correctly get all users if needed.
     *
     * @throws Exception
     */
    @Test
    @Transactional
    public void testGetAllDiagnosis() throws Exception {
        // given
        // when
        objectMapper.enable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.get("/diagnoses")
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
    public void testCreateNewDiagnosisWell() throws Exception {
        // given
        Diagnosis diagnosis = new Diagnosis(23, "Well");
        // when
        System.out.println("TEST START testCreateNewDiagnosis");
        objectMapper.enable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/diagnoses")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(diagnosis));

        System.out.println("Sending");
        System.out.println(objectMapper.writeValueAsString(diagnosis).toString());
        // then
        mockMvc.perform(mockRequest)
                .andExpect(status().is(201))
                .andExpect(jsonPath("$.diagnosisType", equalTo("Well")));

    }

    @Test
    @Transactional
    public void testCreateNewDiagnosisSevere() throws Exception {
        // given
        Diagnosis diagnosis = new Diagnosis(23, "Severe");
        // when
        System.out.println("TEST START testCreateNewDiagnosis");
        objectMapper.enable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/diagnoses")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(diagnosis));

        System.out.println("Sending");
        System.out.println(objectMapper.writeValueAsString(diagnosis).toString());
        // then
        mockMvc.perform(mockRequest)
                .andExpect(status().is(201))
                .andExpect(jsonPath("$.diagnosisType", equalTo("Severe")));

    }

    @Test
    @Transactional
    public void testCreateNewDiagnosisExtreme() throws Exception {
        // given
        Diagnosis diagnosis = new Diagnosis(23, "Extreme");
        // when
        System.out.println("TEST START testCreateNewDiagnosis");
        objectMapper.enable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/diagnoses")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(diagnosis));

        System.out.println("Sending");
        System.out.println(objectMapper.writeValueAsString(diagnosis).toString());
        // then
        mockMvc.perform(mockRequest)
                .andExpect(status().is(201))
                .andExpect(jsonPath("$.diagnosisType", equalTo("Extreme")));

    }

    @Test
    @Transactional
    public void testDiagnosisById() throws Exception {
        // given
        objectMapper.enable(MapperFeature.USE_ANNOTATIONS);
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/diagnoses")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(this.testDiagnosis));
        MvcResult result = mockMvc.perform(mockRequest)
                .andExpect(status().is(201))
                .andReturn();

        String response = result.getResponse().getContentAsString();
        DiagnosisResponse diagnosisResponse = objectMapper.readValue(response,DiagnosisResponse.class);

        int id = diagnosisResponse.getDiagnosisId();

        // when
        MockHttpServletRequestBuilder mockRequest2 = MockMvcRequestBuilders.get("/diagnoses" + id)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        // then
        mockMvc.perform(mockRequest)
                .andExpect(status().is(201));

    }


}
