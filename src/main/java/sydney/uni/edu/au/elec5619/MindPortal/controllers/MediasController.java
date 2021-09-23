package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Media;
import sydney.uni.edu.au.elec5619.MindPortal.exceptions.MediaNotFoundException;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.MediaRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medias")
public class MediasController {
    @Autowired
    MediaRepository mediaRepo;

    @GetMapping
    public ResponseEntity<List<Media>> getAllMedias(){
        List<Media> medias = mediaRepo.findAll();
        return new ResponseEntity<>(medias, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Media> addMedia(@Valid @RequestBody Media newMedia){
        mediaRepo.save(newMedia);
        return new ResponseEntity<>(newMedia, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Media> getMediaById(@PathVariable("id") Integer id){
        Optional<Media> optionalMedia = mediaRepo.findById(id);
        if(optionalMedia.isPresent()){
            Media media = optionalMedia.get();
            return new ResponseEntity<Media>(media, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping
    public ResponseEntity<Media> updateMedia(@Valid @RequestBody Media media){
        // add some validation on this.
        Media updatedMedia = mediaRepo.save(media);
        return new ResponseEntity<>(updatedMedia, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedia(@PathVariable("id") Integer id){
        try {
            Media mediaToDelete = mediaRepo.findById(id).orElseThrow(() -> new MediaNotFoundException("Media of id:" + id + " not found"));
            mediaRepo.delete(mediaToDelete);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(MediaNotFoundException ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }



}
