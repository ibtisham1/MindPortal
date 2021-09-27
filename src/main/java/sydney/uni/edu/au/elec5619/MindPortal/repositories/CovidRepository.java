package sydney.uni.edu.au.elec5619.MindPortal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Covid;

import java.util.Date;

public interface CovidRepository extends JpaRepository<Covid, Date> {
}
