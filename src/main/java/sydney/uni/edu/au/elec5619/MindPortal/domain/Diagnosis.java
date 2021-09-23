package sydney.uni.edu.au.elec5619.MindPortal.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import sydney.uni.edu.au.elec5619.MindPortal.domain.Media;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "diagnoses")
public class Diagnosis{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer diagnosisId;


    @NotBlank(message = "diagnosis type is mandatory")
    private String diagnosisType;

    @OneToMany(mappedBy = "diagnosis", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Media> medias = new HashSet<>();

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
