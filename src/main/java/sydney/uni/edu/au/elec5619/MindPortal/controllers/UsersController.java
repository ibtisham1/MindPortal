package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.passay.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sydney.uni.edu.au.elec5619.MindPortal.MindPortalApplication;
import sydney.uni.edu.au.elec5619.MindPortal.config.JwtTokenUtil;
import sydney.uni.edu.au.elec5619.MindPortal.domain.*;
import sydney.uni.edu.au.elec5619.MindPortal.exceptions.UserNotFoundException;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.DiagnosisRepository;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.MediaRepository;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.QuestionnaireResponsesRepository;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserRepository;
import sydney.uni.edu.au.elec5619.MindPortal.service.JwtUserDetailsService;

import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    UserRepository userRepo;

    @Autowired
    DiagnosisRepository diagnosisRepository;

    @Autowired
    MediaRepository mediaRepository;


    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    QuestionnaireResponsesRepository questionnaireResponsesRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userRepo.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id){
        Optional<User> optionalUser = userRepo.findById(id);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user){
        // create custom validation as we can't use the @Valid annotation with password field missing.
        // user find by email or id
        Optional<User> updatedUserOpt = userRepo.findById(user.getId());
        if(updatedUserOpt.isPresent()){
            User oldUser = updatedUserOpt.get();
            oldUser.setFirstName(user.getFirstName());
            oldUser.setLastName(user.getLastName());
            oldUser.setEmail(user.getEmail());
            userRepo.save(oldUser);

            // Must refresh JWT in case email has changed.
            final UserDetails userDetails = userDetailsService.loadUserByUsername(oldUser.getEmail());
            final String token = jwtTokenUtil.generateToken(userDetails);
            Map<String, Object> response = new HashMap<String, Object>();
            response.put("user", oldUser);
            response.put("token", new JwtResponse(token));


            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id){
        try {
            User userToDelete = userRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User of id:" + id + " not found"));
            userRepo.delete(userToDelete);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(UserNotFoundException ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

    @GetMapping("/get_media_for_user/{id}")
    public @ResponseBody List<String> getMediaByUserId(@PathVariable("id") Integer id){

        List<Media> mediaList = new ArrayList<Media>();

        Set<Diagnosis> diagnosisSet = diagnosisRepository.findAllByUserId(id);
        final Iterator<Diagnosis> iterator = diagnosisSet.iterator();
        Diagnosis lastItem = iterator.next();
        while (iterator.hasNext()){
            lastItem = iterator.next();
        }

        Set<Media> mediaSet = mediaRepository.findAllByDiagnosisDiagnosisId(lastItem.getDiagnosisId());
        final Iterator<Media> mediaIterator = mediaSet.iterator();
        Media toStore;
        while (mediaIterator.hasNext()){
            toStore = mediaIterator.next();
            mediaList.add(toStore);
        }




//        List<Media> mediaList = new ArrayList<Media>(mediaRepository.findAllByDiagnosisDiagnosisId(lastItem.getDiagnosisId()));
//
       // System.out.println(mediaList);
       // System.out.println(lastItem.getDiagnosisId());
//        for (Media media:mediaList){
//            System.out.println(media.getMediaURL());
//        }

        List<String> mediaUrls = new ArrayList<>();
        for (Media media: mediaList){
            mediaUrls.add(media.getMediaURL());
        }
        return mediaUrls ;
    }

    @GetMapping("/get_questionnaire_responses_for_user/{id}")
    public @ResponseBody List<String> getQuestionnaireResponsesByUserId(@PathVariable("id") Integer id){

        Set<QuestionnaireResponses> questionnaireResponses = questionnaireResponsesRepository.findAllByUserId(id);
        final Iterator<QuestionnaireResponses> questionnaireResponsesIterator = questionnaireResponses.iterator();

        List<QuestionnaireResponses> questionnaireResponsesList = new ArrayList<>();

        QuestionnaireResponses toStore;
        while (questionnaireResponsesIterator.hasNext()){
            toStore = questionnaireResponsesIterator.next();
            questionnaireResponsesList.add(toStore);
        }

        List<String> responses = new ArrayList<>();
        for(QuestionnaireResponses questionnaireResponses1: questionnaireResponsesList){
            responses.add(questionnaireResponses1.getResponses());
        }

        return responses;
    }

    @PutMapping("/{id}/changePassword")
    public ResponseEntity<?> changePassword(@PathVariable("id") Integer id, @RequestBody PasswordChangeRequest passwordChangeRequest){
        User user = userRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User of id:" + id + " not found"));
        Logger logger = LoggerFactory.getLogger(MindPortalApplication.class);

        PasswordValidator validator = new PasswordValidator(Arrays.asList(
                new LengthRule(6, 30),
                new UppercaseCharacterRule(1),
                new DigitCharacterRule(1)

        ));

        RuleResult result = validator.validate(new PasswordData(passwordChangeRequest.getNewPassword()));

        if(!result.isValid()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("insufficient password strength");
        }


        if(bcryptEncoder.matches(passwordChangeRequest.getOldPassword(), user.getPassword())){
            // matching password, update the users password
            user.setPassword(bcryptEncoder.encode(passwordChangeRequest.getNewPassword()));
            userRepo.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            logger.warn("Password incorrect");
            // bad response
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }



}
