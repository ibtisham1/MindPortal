package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserInformationRepository;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserRepository;

@RestController
@RequestMapping("/users")
public class UserInformationController {
    @Autowired
    UserInformationRepository userInformationRepository;
}
