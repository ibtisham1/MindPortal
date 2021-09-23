package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Diagnosis;
import sydney.uni.edu.au.elec5619.MindPortal.exceptions.DiagnosisNotFoundException;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.DiagnosisRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/diagnoses")
public class DiagnosisController {
    @Autowired
    DiagnosisRepository diagnosisRepo;

    @GetMapping
    public ResponseEntity<List<Diagnosis>> getAllDiagnoses(){
        List<Diagnosis> diagnoses = diagnosisRepo.findAll();
        return new ResponseEntity<>(diagnoses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Diagnosis> addDiagnosis(@Valid @RequestBody Diagnosis newDiagnosis){
        diagnosisRepo.save(newDiagnosis);
        return new ResponseEntity<>(newDiagnosis, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Diagnosis> getDiagnosisById(@PathVariable("id") Integer id){
        Optional<Diagnosis> optionalDiagnosis = diagnosisRepo.findById(id);
        if(optionalDiagnosis.isPresent()){
            Diagnosis diagnosis = optionalDiagnosis.get();
            return new ResponseEntity<Diagnosis>(diagnosis, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping
    public ResponseEntity<Diagnosis> updateDiagnosis(@Valid @RequestBody Diagnosis diagnosis){
        // add some validation on this.
        Diagnosis updatedDiagnosis = diagnosisRepo.save(diagnosis);
        return new ResponseEntity<>(updatedDiagnosis, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDiagnosis(@PathVariable("id") Integer id){
        try {
            Diagnosis diagnosisToDelete = diagnosisRepo.findById(id).orElseThrow(() -> new DiagnosisNotFoundException("Diagnosis of id:" + id + " not found"));
            diagnosisRepo.delete(diagnosisToDelete);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(DiagnosisNotFoundException ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }



}
