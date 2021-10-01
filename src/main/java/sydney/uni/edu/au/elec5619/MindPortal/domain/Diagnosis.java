package sydney.uni.edu.au.elec5619.MindPortal.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import org.codehaus.jackson.annotate.JsonIgnore;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Media;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "diagnoses")
public class Diagnosis{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "diagnosis_id")
    private Integer diagnosisId;
    @NotBlank(message = "diagnosisType is mandatory")
    private String diagnosisType;

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "diagnosis_id")
    private Set<Media> medias;

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    public Diagnosis(){}

    public Diagnosis(Integer diagnosisId, String diagnosisType){
        this.diagnosisId = diagnosisId;
        this.diagnosisType = diagnosisType;
    }


    public Integer getDiagnosisId() {
        return diagnosisId;
    }

    public void setDiagnosisId(Integer diagnosisId) {
        this.diagnosisId = diagnosisId;
    }

    public String getDiagnosisType() {
        return diagnosisType;
    }

    public void setDiagnosisType(String diagnosisType) {
        this.diagnosisType = diagnosisType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
