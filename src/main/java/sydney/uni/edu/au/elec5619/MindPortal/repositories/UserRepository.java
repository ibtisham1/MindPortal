package sydney.uni.edu.au.elec5619.MindPortal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import sydney.uni.edu.au.elec5619.MindPortal.domain.Diagnosis;
=======
import org.springframework.stereotype.Repository;
>>>>>>> Development
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
<<<<<<< HEAD

=======
    User findByEmail(String email);
>>>>>>> Development
}
