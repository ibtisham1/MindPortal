package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Diagnosis;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Media;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;
import sydney.uni.edu.au.elec5619.MindPortal.exceptions.UserNotFoundException;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.DiagnosisRepository;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.MediaRepository;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserRepository;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    UserRepository userRepo;

    @Autowired
    DiagnosisRepository diagnosisRepository;

    @Autowired
    MediaRepository mediaRepository;
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userRepo.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> addUser(@Valid @RequestBody User newUser){
        userRepo.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
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
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user){
        // add some validation on this.
        User updatedUser = userRepo.save(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
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
    public @ResponseBody List<Media> getMediaByUserId(@PathVariable("id") Integer id){

        Set<Diagnosis> diagnosisSet = diagnosisRepository.findAllByUserId(id);
        final Iterator<Diagnosis> iterator = diagnosisSet.iterator();
        Diagnosis lastItem = iterator.next();
        while (iterator.hasNext()){
            lastItem = iterator.next();
        }

        List<Media> mediaList = new ArrayList<Media>(mediaRepository.findAllByDiagnosisDiagnosisId(lastItem.getDiagnosisId()));

        System.out.println(mediaList);
        return mediaList ;
    }



}
