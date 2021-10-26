package sydney.uni.edu.au.elec5619.MindPortal.domain;


import java.io.Serializable;

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
