package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import sydney.uni.edu.au.elec5619.MindPortal.domain.FaceAPIResponse;
import sydney.uni.edu.au.elec5619.MindPortal.domain.FaceAttributes;
import sydney.uni.edu.au.elec5619.MindPortal.domain.SmileResponse;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;

@RestController
@RequestMapping("/api/smile/{id}")
public class SmileController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    UserRepository userRepo;


    @PostMapping(value = "/getResult")
    public ResponseEntity<?> getResult(@RequestBody byte[] byteArray, @PathVariable("id") Integer id) {

        String key = "6e4ccc74ec694dce89968a7db92f9660";
        HttpPost httpPost = new HttpPost("https://mindportal.cognitiveservices.azure.com/face/v1.0/detect");

        URI uri = null;
        try {
            uri = new URIBuilder(httpPost.getURI())
                    .addParameter("returnFaceAttributes", "smile, emotion, age, gender")
                    .build();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }


        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/octet-stream");
        headers.set("Ocp-Apim-Subscription-Key", key);


        try {

            HttpEntity<byte[]> entity = new HttpEntity<byte[]>(byteArray, headers);
            FaceAPIResponse[] faceAPIResponses = restTemplate.postForObject(uri, entity, FaceAPIResponse[].class);

            if (faceAPIResponses != null && faceAPIResponses.length != 0) {
                FaceAPIResponse result = faceAPIResponses[0];
                if (result != null) {
                    if (result.getFaceAttributes() != null) {
                        FaceAttributes faceAttributes = result.getFaceAttributes();
                        if (faceAttributes != null) {
                            System.out.println("smile score: " + faceAttributes.getSmile());
                            double score = faceAttributes.getSmile();
                            // if score > 85 add to user
                            if (score >= 0.85) {
                                // find user and set most recent date to e erg
                                User user = userRepo.findById(id).get();
                                user.setMostRecentSmileChallengePass(new Timestamp(System.currentTimeMillis()));
                                userRepo.save(user);
                            }

                            SmileResponse smileResponse = new SmileResponse(score);
                            return new ResponseEntity<>(smileResponse, HttpStatus.OK);
                        }
                    }
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);


    }


}
