package sydney.uni.edu.au.elec5619.MindPortal.domain;

import javax.persistence.*;

@Entity
@Table(name = "user_information")
public class UserInformation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="user_information_id")
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "userInformation" )
    private User user;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
