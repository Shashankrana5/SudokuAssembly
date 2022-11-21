package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @GetMapping("/adminconsole/getall")
    public List<User> getall(){
        return userService.getAll();
    }
    @PostMapping("/adminconsole/adduser")
    public User createUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @DeleteMapping("/adminconsole")
    public void deleteUser(@RequestBody User user){
        UUID id = user.getId();
        userService.deleteUser(id);}
}
