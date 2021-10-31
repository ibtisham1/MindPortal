package sydney.uni.edu.au.elec5619.MindPortal.domain;


import java.io.Serializable;

/**
 * The SmileResponse class models the response from backend to the frontend of the smile challenge score.
 */
public class SmileResponse implements Serializable {

    private double score;

    public SmileResponse(double score) {
        this.score = score;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
