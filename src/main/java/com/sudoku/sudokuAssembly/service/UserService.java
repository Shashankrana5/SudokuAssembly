package com.sudoku.sudokuAssembly.service;


import com.sudoku.sudokuAssembly.entity.User;

import java.util.List;
import java.util.UUID;


public interface UserService {


    List<User> findAll();
    User saveUser(User user);
    User findById(UUID id);
}
