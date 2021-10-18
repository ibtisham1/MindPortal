package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Covid;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.CovidRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/covid")

public class CovidController {
    @Autowired
    CovidRepository covidRepository;

    @GetMapping
    public ResponseEntity<List<Covid>> getAllDiagnoses(){
        List<Covid> covidList = covidRepository.findAll();
        return new ResponseEntity<>(covidList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Covid> addDiagnosis(@Valid @RequestBody Covid newCovid){
        covidRepository.save(newCovid);
        return new ResponseEntity<>(newCovid, HttpStatus.CREATED);
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<Diagnosis> getDiagnosisById(@PathVariable("id") Integer id){
//        Optional<Diagnosis> optionalDiagnosis = diagnosisRepo.findById(id);
//        if(optionalDiagnosis.isPresent()){
//            Diagnosis diagnosis = optionalDiagnosis.get();
//            return new ResponseEntity<Diagnosis>(diagnosis, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//    }

    @PutMapping
    public ResponseEntity<Covid> updateCovid(@Valid @RequestBody Covid covid){
        // add some validation on this.
        Covid updatedCovid = covidRepository.save(covid);
        return new ResponseEntity<>(updatedCovid, HttpStatus.OK);
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteCovid(@PathVariable("id") Integer id){
//        try {
//            Diagnosis diagnosisToDelete = diagnosisRepo.findById(id).orElseThrow(() -> new DiagnosisNotFoundException("Diagnosis of id:" + id + " not found"));
//            diagnosisRepo.delete(diagnosisToDelete);
//            return new ResponseEntity<>(HttpStatus.OK);
//        } catch(DiagnosisNotFoundException ex){
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//
//    }
}
