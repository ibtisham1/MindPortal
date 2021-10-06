package sydney.uni.edu.au.elec5619.MindPortal.domain;

import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @NotBlank(message = "email is mandatory")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "password is mandatory")
    private String password;

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "id")
    private Set<Diagnosis> diagnoses;

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "id")
    private Set<QuestionnaireResponses> questionnaireResponses;

    public User(){}

    public User( String firstName, String lastName, String email, String password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Diagnosis> getDiagnoses() {
        return diagnoses;
    }

    public void setDiagnoses(Set<Diagnosis> diagnoses) {
        this.diagnoses = diagnoses;
    }

    public Set<QuestionnaireResponses> getQuestionnaireResponses() {
        return questionnaireResponses;
    }

    public void setQuestionnaireResponses(Set<QuestionnaireResponses> questionnaireResponses) {
        this.questionnaireResponses = questionnaireResponses;
    }
}
