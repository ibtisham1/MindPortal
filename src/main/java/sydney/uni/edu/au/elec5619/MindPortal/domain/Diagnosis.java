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



    private String diagnosisType;

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "diagnosis_id")
    private Set<Media> medias;


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
}
