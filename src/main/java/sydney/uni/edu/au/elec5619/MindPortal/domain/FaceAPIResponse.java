package sydney.uni.edu.au.elec5619.MindPortal.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Helper class for the response object from Azure Face API.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class FaceAPIResponse {

    public FaceAttributes faceAttributes;
    private String faceId;

    public FaceAPIResponse() {
    }

    public FaceAttributes getFaceAttributes() {
        return faceAttributes;
    }

    public void setFaceAttributes(FaceAttributes faceAttributes) {
        this.faceAttributes = faceAttributes;
    }

    public String getFaceId() {
        return faceId;
    }

    public void setFaceId(String faceId) {
        this.faceId = faceId;
    }



}
