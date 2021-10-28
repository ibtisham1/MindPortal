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

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;


    public QuestionnaireResponses(){}

    public QuestionnaireResponses(Integer questionnaireResponsesId, String responses, User user){
        this.questionnaireResponsesId = questionnaireResponsesId;
        this.responses = responses;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
