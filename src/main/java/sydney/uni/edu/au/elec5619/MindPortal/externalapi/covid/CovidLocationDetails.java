package sydney.uni.edu.au.elec5619.MindPortal.externalapi.covid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CovidLocationDetails {

    @JsonProperty("Venue")
    private String venue;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("Suburb")
    private String suburb;

    public String getVenue() {
        return venue;
    }

    public String getAddress() {
        return address;
    }

    public String getSuburb() {
        return suburb;
    }

}
