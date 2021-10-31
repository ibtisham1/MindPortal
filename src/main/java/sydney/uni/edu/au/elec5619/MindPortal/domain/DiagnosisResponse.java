package sydney.uni.edu.au.elec5619.MindPortal.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DiagnosisResponse {

    @JsonProperty("diagnosisId")
    private int diagnosisId;
    @JsonProperty("diagnosisType")
    private String diagnosisType;

    public String getDiagnosisType() {
        return diagnosisType;
    }

    public int getDiagnosisId() {
        return diagnosisId;
    }
}
