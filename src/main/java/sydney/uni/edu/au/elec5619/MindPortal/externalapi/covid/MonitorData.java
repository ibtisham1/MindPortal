package sydney.uni.edu.au.elec5619.MindPortal.externalapi.covid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MonitorData {

    private List<CovidLocationDetails> monitor;

    public List<CovidLocationDetails> getMonitor() {
        return monitor;
    }

    public void setMonitor(List<CovidLocationDetails> monitor) {
        this.monitor = monitor;
    }

}
