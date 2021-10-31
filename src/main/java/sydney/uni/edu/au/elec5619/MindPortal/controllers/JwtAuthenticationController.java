package sydney.uni.edu.au.elec5619.MindPortal.controllers;

import org.passay.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sydney.uni.edu.au.elec5619.MindPortal.MindPortalApplication;
import sydney.uni.edu.au.elec5619.MindPortal.config.JwtTokenUtil;
import sydney.uni.edu.au.elec5619.MindPortal.domain.JwtRequest;
import sydney.uni.edu.au.elec5619.MindPortal.domain.JwtResponse;
import sydney.uni.edu.au.elec5619.MindPortal.domain.User;
import sydney.uni.edu.au.elec5619.MindPortal.repositories.UserRepository;
import sydney.uni.edu.au.elec5619.MindPortal.service.JwtUserDetailsService;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;


/**
 * The JWT AuthenticationController is responsible for authenticating existing users and registering new ones.
 */
@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    Logger logger = LoggerFactory.getLogger(MindPortalApplication.class);

    @RequestMapping(value = "/authenticate")
    @PostMapping
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        System.out.println(authenticationRequest.getUsername() + " " + authenticationRequest.getPassword());
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        Map<String, Object> response = new HashMap<String, Object>();
        User user = userRepo.findByEmail(authenticationRequest.getUsername());

        if (user != null) {
            response.put("user", user);
            response.put("token", new JwtResponse(token));
        } else {
            System.out.println("Somehow we got here and the user is null....");
        }

        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/register")
    @PostMapping
    public ResponseEntity<?> saveUser(@Valid @RequestBody User user) throws Exception {

        PasswordValidator validator = new PasswordValidator(Arrays.asList(
                new LengthRule(6, 30),
                new UppercaseCharacterRule(1),
                new DigitCharacterRule(1)

        ));

        RuleResult result = validator.validate(new PasswordData(user.getPassword()));

        if (!result.isValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("insufficient password strength");
        }

        try {
            User newUser = userDetailsService.save(user);
            authenticate(newUser.getEmail(), user.getPassword());

            final UserDetails userDetails = userDetailsService.loadUserByUsername(newUser.getEmail());
            final String token = jwtTokenUtil.generateToken(userDetails);

            Map<String, Object> response = new HashMap<String, Object>();

            response.put("user", newUser);
            response.put("token", new JwtResponse(token));


            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error creating user");
        }

    }

    private void authenticate(String email, String password) throws Exception {
        try {
            System.out.println("email: " + email + " password: " + password);
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }


}
