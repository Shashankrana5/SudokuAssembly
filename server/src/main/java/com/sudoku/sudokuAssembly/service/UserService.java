package com.sudoku.sudokuAssembly.service;


import com.sudoku.sudokuAssembly.entity.User;

import java.util.List;
import java.util.UUID;


public interface UserService {


    List<User> findAll();
    User saveUser(User user);
    User findById(UUID id);
    User findByEmail(String email);
    User findByUsername(String username);
    public User updateLogin(User user);
}
