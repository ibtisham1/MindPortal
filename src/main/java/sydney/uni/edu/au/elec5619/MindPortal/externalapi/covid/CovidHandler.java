package sydney.uni.edu.au.elec5619.MindPortal.externalapi.covid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
public class CovidHandler {

    @Autowired
    private RestTemplate restTemplate;

    private static  String URL =  "https://data.nsw.gov.au/data/dataset/0a52e6c1-bc0b-48af-8b45-d791a6d8e289/resource/f3a28eed-8c2a-437b-8ac1-2dab3cf760f9/download/covid-case-locations-20210717-1753.json";


    @GetMapping("/covid/data")
    public Object getCovidData(){
            Object data = restTemplate.getForObject(URL, Object.class );

            return data;
    }


}
