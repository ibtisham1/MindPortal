package sydney.uni.edu.au.elec5619.MindPortal.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer mediaId;

    @NotBlank(message = "URL is mandatory")
    private String mediaURL;

    @NotBlank(message = "media type is mandatory")
    private String mediaType;


    @ManyToOne()
    @JoinColumn(name = "diagnosis_id")
    private Diagnosis diagnosis;

    public Media(){}

    public Media(Integer mediaId, String mediaURL, String mediaType){
        this.mediaId = mediaId;
        this.mediaURL = mediaURL;
        this.mediaType = mediaType;
    }


    public Integer getMediaId() {
        return mediaId;
    }

    public void setMediaId(Integer mediaId) {
        this.mediaId = mediaId;
    }

    public String getMediaURL() {
        return mediaURL;
    }

    public void setMediaURL(String mediaURL) {
        this.mediaURL = mediaURL;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public Diagnosis getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(Diagnosis diagnosis) {
        this.diagnosis = diagnosis;
    }
}
