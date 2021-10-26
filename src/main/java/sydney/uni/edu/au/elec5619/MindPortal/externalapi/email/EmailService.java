package sydney.uni.edu.au.elec5619.MindPortal.externalapi.email;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sendgrid.Content;
import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;

/*
Cited : https://medium.com/javarevisited/sending-emails-with-sendgrid-and-spring-boot-81e9637a1f05
 */

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public String sendTextEmail(String senderEmail, String emailBody) throws IOException {
        // the sender email should be the same as we used to Create a Single Sender Verification
        Email from = new Email("sima3098@uni.sydney.edu.au");
        String subject = "Mind Portal: Your K10 results are here!";
        Email to = new Email(senderEmail);
        Content content = new Content("text/plain", emailBody);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid("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");
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);
        logger.info(response.getBody());
        return response.getBody();
    }

}
