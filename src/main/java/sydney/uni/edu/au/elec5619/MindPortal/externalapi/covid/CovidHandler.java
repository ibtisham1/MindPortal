package sydney.uni.edu.au.elec5619.MindPortal.externalapi.covid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CovidHandler {

    @Autowired
    private RestTemplate restTemplate;


    @GetMapping("/covid/data")
    public List<CovidLocationDetails> getCovidData(){
        System.out.println("COVID API CALL");
        String URL = "https://data.nsw.gov.au/data/dataset/0a52e6c1-bc0b-48af-8b45-d791a6d8e289/resource/f3a28eed-8c2a-437b-8ac1-2dab3cf760f9/download/covid-case-locations-20210717-1753.json";
        CovidDataAPIResponse data = restTemplate.getForObject(URL, CovidDataAPIResponse.class );

        // Formatting
        assert data != null;

        List<CovidLocationDetails> formatted = new ArrayList<>();
        for(int i = 0; i<data.getData().getMonitor().size()-2; i++ ){

            if(!(data.getData().getMonitor().get(i).getVenue().equals(data.getData().getMonitor().get(i+1).getVenue()))){
                formatted.add(data.getData().getMonitor().get(i));
            }
        }

        // Top - 5
        List<CovidLocationDetails> output = new ArrayList<>();
        for(int i = 0; i<5; i++ ){
           output.add(formatted.get(i));
        }
        return output;
    }

}
