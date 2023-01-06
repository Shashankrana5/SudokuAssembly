package com.sudoku.sudokuAssembly.controller;


import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.entity.UserLogin;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.security.Security;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@CrossOrigin("http://localhost:3000/")
public class UserController {

    private final UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService){this.userService = userService;};


    @PostMapping("/register")
    String registration(@RequestBody Sudoku sudoku){
        return sudoku.getPuzzle();
    }

    @GetMapping("/homee")
    public String homee(){
        return "this is the home page";
    }

    @GetMapping("/adminconsole/users/{id}")
    private User getUserById(@PathVariable UUID id){
        User user = userService.findById(id);
        return user;
    }

    @GetMapping("/adminconsole")
    public String ad(){
        return "admin";
    }

    @GetMapping("/adminconsole/getall")
    public List<User> findAll(){
        return userService.findAll();
    }

    @PostMapping("/adduser")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/findoutloggedin")
    public void home(@AuthenticationPrincipal Principal user) {

        System.out.println(user);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        SecurityContextHolder.getContextHolderStrategy().getContext().getAuthentication().getPrincipal()
        System.out.println(auth.getDetails());
        System.out.println(auth.getCredentials());
        System.out.println(auth.getName());
        System.out.println(auth.getPrincipal());
        System.out.println(auth.getAuthorities());
    }
//    @RequestMapping(value = "/trylogginging", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
        @PostMapping("/trylogginging")
        public ResponseEntity<HttpStatus> login(UserLogin userLogin) throws Exception {

        String username = userLogin.getUsername();
        String password = userLogin.getPassword();
        Authentication authentication;
//
        try{
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            System.out.println(authentication.toString());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            System.out.println(auth.getName());
            if ((auth instanceof UsernamePasswordAuthenticationToken))
                System.out.println("it is a token");
            else{
                System.out.println("it's nota token");
            }

            System.out.println(SecurityContextHolder.getContext().getAuthentication());
        }catch(BadCredentialsException e){
            throw new Exception("Invalid exception" + e);
        }
            System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }

    @PostMapping("/loginhandle")
    public ResponseEntity<HttpStatus> loginhandle(UserLogin userLogin) throws Exception {
        String username = userLogin.getUsername();
        String password = userLogin.getPassword();
        Authentication authentication;
        try{

            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
//            System.out.println(SecurityContextHolder.getContext());
            System.out.println(contextGetter());
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);

        }
        catch(Exception e){
            throw new Exception(e);
        }

    }
    public Authentication contextGetter(){
        return SecurityContextHolder.getContext().getAuthentication();
    }

}
