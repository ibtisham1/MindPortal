package sydney.uni.edu.au.elec5619.MindPortal.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table(name = "media")
public class Media implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer mediaId;

    @NotBlank(message = "URL is mandatory")
    private String mediaURL;

    @NotBlank(message = "media type is mandatory")
    private String mediaType;

    @ManyToOne
    @JoinColumn(name = "diagnosis_id", nullable = false)
    private Diagnosis diagnosis;

    public Media(){}

    public Media(Integer mediaId, String mediaURL, String mediaType, Diagnosis diagnosis){
        this.mediaId = mediaId;
        this.mediaURL = mediaURL;
        this.mediaType = mediaType;
        this.diagnosis = diagnosis;
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
}
