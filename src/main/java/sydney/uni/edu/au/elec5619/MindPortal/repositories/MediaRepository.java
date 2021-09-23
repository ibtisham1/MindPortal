package sydney.uni.edu.au.elec5619.MindPortal.repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Diagnosis;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Media;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Integer> {

}
