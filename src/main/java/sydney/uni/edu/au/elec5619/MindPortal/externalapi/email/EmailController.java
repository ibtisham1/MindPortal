package sydney.uni.edu.au.elec5619.MindPortal.externalapi.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    EmailService emailService;


    @PostMapping("/send_results")
    public ResponseEntity<?> send(@RequestBody EmailMaker emailMaker ) throws IOException {
        Map<String, Object> response = new HashMap<String, Object>();

        if (emailMaker.getEmailBody() == null){
            response.put("status", "400");
            response.put("message", "The emailBody parameter is missing");
            return ResponseEntity.ok(response);
        }

        if( emailMaker.getSenderEmail() == null){
            response.put("status", "400");
            response.put("message", "The sender's email address is missing");
            return ResponseEntity.ok(response);
        }
        System.out.println("SENDING EMAIL --");
        emailService.sendTextEmail(emailMaker.getSenderEmail(), emailMaker.getEmailBody());

        response.put("status", "200");
        response.put("message", "The email was sent.");
        return ResponseEntity.ok(response);

    }


}
