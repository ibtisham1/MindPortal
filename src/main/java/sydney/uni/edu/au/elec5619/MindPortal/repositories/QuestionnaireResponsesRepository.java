package sydney.uni.edu.au.elec5619.MindPortal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sydney.uni.edu.au.elec5619.MindPortal.domain.QuestionnaireResponses;

public interface QuestionnaireResponsesRepository extends JpaRepository<QuestionnaireResponses, Integer> {
}
