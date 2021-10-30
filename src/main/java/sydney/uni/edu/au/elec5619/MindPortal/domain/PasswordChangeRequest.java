package sydney.uni.edu.au.elec5619.MindPortal.domain;

import java.io.Serializable;

/**
 * PasswordChangeRequest is used for the purposes of modifying a user's password.
 */
public class PasswordChangeRequest implements Serializable {
    private static final long serialVersionUID = 5926468583005150783L;
    private String oldPassword;
    private String newPassword;

    public PasswordChangeRequest() {
    }


    public PasswordChangeRequest(String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }


    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
