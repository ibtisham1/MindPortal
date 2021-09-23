package sydney.uni.edu.au.elec5619.MindPortal.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "questionaireResponses")
public class QuestionnaireResponses {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer questionnaireResponsesId;

    @NotBlank(message = "responses are mandatory")
    private String responses;

    public QuestionnaireResponses(){}

    public QuestionnaireResponses(Integer questionnaireResponsesId, String responses){
        this.questionnaireResponsesId = questionnaireResponsesId;
        this.responses = responses;
    }


    public Integer getQuestionnaireResponsesId() {
        return questionnaireResponsesId;
    }

    public void setQuestionnaireResponsesId(Integer questionnaireResponsesId) {
        this.questionnaireResponsesId = questionnaireResponsesId;
    }

    public String getResponses() {
        return responses;
    }

    public void setResponses(String responses) {
        this.responses = responses;
    }
}
