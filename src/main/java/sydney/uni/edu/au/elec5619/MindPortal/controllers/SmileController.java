package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RestController
@RequestMapping("/api/smile")
public class SmileController {

    @PostMapping(value = "/getResult", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<?> getResult(@RequestBody byte[] byteArray) {

        System.out.println("started method");
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

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .header("Content-Type", " application/octet-stream")
                .header("Ocp-Apim-Subscription-Key", key)
                .POST(HttpRequest.BodyPublishers.ofByteArray(byteArray))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response);
            System.out.println(response.body());
            return new ResponseEntity<>(response.body(), HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);


    }


}
