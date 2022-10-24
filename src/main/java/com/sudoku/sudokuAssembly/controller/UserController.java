package com.sudoku.sudokuAssembly.controller;


import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

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

    @GetMapping("/userinfo")
    public String us(){
        return "user";
    }

    @GetMapping("/adminconsole")
    public String ad(){
        return "admin";
    }

    @GetMapping("/adminconsole/getall")
    public List<User> findAll(){
        return userService.findAll();
    }

    @PostMapping("/adminconsole/adduser")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/loggingin")
    public String loggingin(){
        return("<h1> this is the logging in page </h1>");
    }

    @GetMapping("/loggingout")
    public String Loggingout(){
        return "this is the logging out prage";
    }
    @GetMapping("/further")
    public String furtherLogOut(){
        return "this is the further logging out page";
    }

}
