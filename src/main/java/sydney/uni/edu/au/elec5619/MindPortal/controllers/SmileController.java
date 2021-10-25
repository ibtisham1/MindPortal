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
import sydney.uni.edu.au.elec5619.MindPortal.domain.FaceAPIValues;
import sydney.uni.edu.au.elec5619.MindPortal.domain.FaceAttributes;
import sydney.uni.edu.au.elec5619.MindPortal.domain.SmileResponse;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;

@RestController
@RequestMapping("/api/smile/{id}")
public class SmileController {

    @Autowired
    private RestTemplate restTemplate;

   
    @PostMapping(value = "/getResult")
    public ResponseEntity<?> getResult(@RequestBody byte[] byteArray, @PathVariable("id") Integer id) {

        String key = "6e4ccc74ec694dce89968a7db92f9660";
        String url = "https://mindportal.cognitiveservices.azure.com/face/v1.0/detect?returnFacedId=true&returnFaceAttributes=smile,age,gender";

        HttpPost httpPost = new HttpPost("https://mindportal.cognitiveservices.azure.com/face/v1.0/detect");

        URI uri = null;
        try {
            uri = new URIBuilder(httpPost.getURI())
                    .addParameter("returnFaceAttributes", "smile, emotion, age, gender")
                    .build();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

//        HttpClient client = HttpClient.newHttpClient();
//
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(uri)
//                .header("Content-Type", " application/octet-stream")
//                .header("Ocp-Apim-Subscription-Key", key)
//                .POST(HttpRequest.BodyPublishers.ofByteArray(byteArray))
//                .build();

        // New post

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/octet-stream");
        headers.set("Ocp-Apim-Subscription-Key", key);




        try {
//            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
//            System.out.println(response);
//            System.out.println(response.body());

            // New
            HttpEntity<byte[]> entity = new HttpEntity<byte[]>(byteArray, headers);
//            FaceAPIResponse faceAPIResponse = restTemplate.postForObject(url, entity, FaceAPIResponse.class, params);
            FaceAPIValues[] faceAPIValues = restTemplate.postForObject(uri, entity, FaceAPIValues[].class);

            if (faceAPIValues != null) {
                System.out.println(Arrays.toString(faceAPIValues));
                FaceAPIValues result = faceAPIValues[0];
                for(FaceAPIValues val :faceAPIValues){
                    if (result != null) {
                        if (result.getFaceId() != null) {
                            System.out.println("id" + result.getFaceId());
                        }
                        if (result.getFaceAttributes() != null) {
                            System.out.println("got attributes");
                            System.out.println(result.getFaceAttributes());
                            FaceAttributes faceAttributes = result.getFaceAttributes();
                            if(faceAttributes != null){
                                System.out.println("smile score: " + faceAttributes.getSmile());

                                double score = faceAttributes.getSmile();

                                // if score > 85 add to user

                                SmileResponse smileResponse = new SmileResponse(score);

                                return new ResponseEntity<>(smileResponse, HttpStatus.OK);
                            }
                        }

                    }
                }
            }
//            FaceAttributes faceAttributes = restTemplate.postForObject(url, entity, FaceAttributes.class, params);

//            if(faceAttributes != null){
//                System.out.println("post for Object worked");
//                System.out.println("smile score: " + faceAttributes.getSmile());
//            }

            return new ResponseEntity<>("okay", HttpStatus.OK);
//            return new ResponseEntity<>(response.body(), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
        }
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);


    }


}
