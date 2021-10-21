package sydney.uni.edu.au.elec5619.MindPortal.externalapi.covid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CovidDataAPIResponse {
    private String date;
    private String time;
    private String title;
    private MonitorData data;

    public CovidDataAPIResponse(){

    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getTitle() {
        return title;
    }

    public MonitorData getData() {
        return data;
    }
}
