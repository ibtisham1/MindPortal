package sydney.uni.edu.au.elec5619.MindPortal.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FaceAPIValues {

    public FaceAttributes faceAttributes;
    private String faceId;

    public FaceAPIValues() {
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


    //    private FaceAttributes faceAttributes;
//
//    public FaceAPIValues() {
//    }
//
//    public FaceAttributes getFaceAttributes() {
//        return faceAttributes;
//    }
//
//    public void setFaceAttributes(FaceAttributes faceAttributes) {
//        this.faceAttributes = faceAttributes;
//    }


}
