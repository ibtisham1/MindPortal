package sydney.uni.edu.au.elec5619.MindPortal.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table( name = "COVID")
public class Covid {
    @Id
    private Date date; //  ' YYYY-MM-DD ' format.
    private Integer covidCases;
    private Double vaccinationRates;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getCovidCases() {
        return covidCases;
    }

    public void setCovidCases(Integer covidCases) {
        this.covidCases = covidCases;
    }

    public Double getVaccinationRates() {
        return vaccinationRates;
    }

    public void setVaccinationRates(Double vaccinationRates) {
        this.vaccinationRates = vaccinationRates;
    }
}
