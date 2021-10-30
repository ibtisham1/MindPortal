package sydney.uni.edu.au.elec5619.MindPortal.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Helper class for the Azure Face API. Nested object of face attributes.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class FaceAttributes {
    private double age;
    private double smile;
    private String gender;

    public FaceAttributes() {
    }

    public double getAge() {
        return age;
    }

    public void setAge(double age) {
        this.age = age;
    }

    public double getSmile() {
        return smile;
    }

    public void setSmile(double smile) {
        this.smile = smile;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
