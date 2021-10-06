package sydney.uni.edu.au.elec5619.MindPortal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sydney.uni.edu.au.elec5619.MindPortal.domain.Diagnosis;
import org.springframework.stereotype.Repository;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
