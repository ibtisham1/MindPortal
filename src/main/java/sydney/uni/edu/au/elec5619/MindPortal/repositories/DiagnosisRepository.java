package sydney.uni.edu.au.elec5619.MindPortal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Diagnosis;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Media;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;

import java.util.Set;

public interface DiagnosisRepository extends JpaRepository<Diagnosis, Integer> {

   Set<Diagnosis> findAllByUserId( Integer id);

}