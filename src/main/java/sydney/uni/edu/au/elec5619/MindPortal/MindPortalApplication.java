package sydney.uni.edu.au.elec5619.MindPortal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@CrossOrigin
@SpringBootApplication
public class MindPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(MindPortalApplication.class, args);

	}

	@Bean
	public RestTemplate getRestTemplate(){
		return new RestTemplate();
	}

//	@Bean
//	public CommandLineRunner mappingDemo(DiagnosisRepository diagnosisRepository,
//										 MediaRepository mediaRepository) {
//		return args -> {
//
//			// create a new book
//			Diagnosis diagnosis = new Diagnosis(1,"testing type");
//
//			// save the book
//			diagnosisRepository.save(diagnosis);
//
//			// create and save new pages
//			mediaRepository.save(new Media(10, "momentsToAppreciate.com", "Moments feature", diagnosis));
//			mediaRepository.save(new Media(11, "mindfulness.com", "Mindfulness feature", diagnosis));
//		};
//	}




}
