package sydney.uni.edu.au.elec5619.MindPortal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Diagnosis;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Media;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.DiagnosisRepository;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.MediaRepository;

import java.util.Arrays;

@SpringBootApplication
public class MindPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(MindPortalApplication.class, args);

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


	@Bean
	public CorsFilter corsFilter(){
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin", "Accept", "X-Requested-With", "Access-Control-Request-Method",
				"Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin","Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
