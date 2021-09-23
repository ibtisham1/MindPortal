package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sydney.uni.edu.au.elec5619.MindPortal.domain.QuestionnaireResponses;
import sydney.uni.edu.au.elec5619.MindPortal.exceptions.QuestionnaireResponsesNotFoundException;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.QuestionnaireResponsesRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questionnaireResponses")
public class QuestionnaireResponsesController {
    @Autowired
    QuestionnaireResponsesRepository questionnaireResponsesRepo;

    @GetMapping
    public ResponseEntity<List<QuestionnaireResponses>> getAllQuestionnaireResponses(){
        List<QuestionnaireResponses> questionnaireResponses = questionnaireResponsesRepo.findAll();
        return new ResponseEntity<>(questionnaireResponses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<QuestionnaireResponses> addQuestionnaireResponses(@Valid @RequestBody QuestionnaireResponses newQuestionnaireResponses){
        questionnaireResponsesRepo.save(newQuestionnaireResponses);
        return new ResponseEntity<>(newQuestionnaireResponses, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionnaireResponses> getQuestionnaireResponsesById(@PathVariable("id") Integer id){
        Optional<QuestionnaireResponses> optionalQuestionnaireResponses = questionnaireResponsesRepo.findById(id);
        if(optionalQuestionnaireResponses.isPresent()){
            QuestionnaireResponses questionnaireResponses = optionalQuestionnaireResponses.get();
            return new ResponseEntity<QuestionnaireResponses>(questionnaireResponses, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping
    public ResponseEntity<QuestionnaireResponses> updateQuestionnaireResponses(@Valid @RequestBody QuestionnaireResponses questionnaireResponses){
        // add some validation on this.
        QuestionnaireResponses updatedQuestionnaireResponses = questionnaireResponsesRepo.save(questionnaireResponses);
        return new ResponseEntity<>(updatedQuestionnaireResponses, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestionnaireResponses(@PathVariable("id") Integer id){
        try {
            QuestionnaireResponses questionnaireResponsesToDelete = questionnaireResponsesRepo.findById(id).orElseThrow(() -> new QuestionnaireResponsesNotFoundException("Media of id:" + id + " not found"));
            questionnaireResponsesRepo.delete(questionnaireResponsesToDelete);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(QuestionnaireResponsesNotFoundException ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }



}
