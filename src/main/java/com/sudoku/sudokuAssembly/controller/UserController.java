package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.entity.UserLogin;
import com.sudoku.sudokuAssembly.service.SudokuService;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;


//@RestController
@Controller
@CrossOrigin("http://localhost:3000/")
public class UserController {

    private final UserService userService;

    private final SudokuService sudokuService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService, SudokuService sudokuService){this.userService = userService;
        this.sudokuService = sudokuService;
    };


    @PostMapping("/register")
    String registration(@RequestBody Sudoku sudoku){
        return sudoku.getPuzzle();
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
    @ResponseBody
    public List<User> findAll(){
        return userService.findAll();
    }

    @PostMapping("/adduser")
    @ResponseBody
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/findoutloggedin")
    public String home(@AuthenticationPrincipal Principal user) {

        System.out.println(user);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getDetails());
        System.out.println(auth.getCredentials());
        System.out.println(auth.getName());
        System.out.println(auth.getPrincipal());
        System.out.println(auth.getAuthorities());

        return "redirect:/";
    }
    @GetMapping("/adminconsole/users/{id}/completed")
    public Set<Sudoku> getAllCompletedSudokus(@PathVariable UUID id){
        return userService.findById(id).getCompleted_sudokus();
    }

    @PostMapping("/loginhandle")
    public String loginhandle(UserLogin userLogin) throws Exception {
        String username = userLogin.getUsername();
        String password = userLogin.getPassword();
        System.out.println(username);
        System.out.println(password);
        Authentication authentication;
        try{

            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return "redirect:/";
        }
        catch(Exception e){
            throw new Exception(e);
        }

    }

    public Authentication contextGetter(){
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @ResponseBody
    @PostMapping("/user/addattempt")
    public void addAttempt(@RequestBody Map<String, String> sudokuId){
        System.out.println(sudokuId);
        UUID sudokuID = UUID.fromString(sudokuId.get("sudoku_id"));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Sudoku sudoku = sudokuService.findById(sudokuID);
        User user = userService.findByEmail(email);
        user.addAttempt(sudoku);
        System.out.println(sudoku.getDate());
        System.out.println(user.getAttempted_sudokus());

        user.addAttempt(sudoku);
        sudoku.addAttempt(user);

        sudokuService.updateAttempt(sudoku);
        System.out.println("HERE THIS");

        user = userService.findByEmail(email);
        System.out.println(user.getAttempted_sudokus());
    }
    @GetMapping("/signin")
    public String signin(){
        return "login";}
}
