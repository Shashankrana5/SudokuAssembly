package com.sudoku.sudokuAssembly.service;


import com.sudoku.sudokuAssembly.entity.User;

import java.util.List;


public interface UserService {


    List<User> findAll();
    User saveUser(User user);

}
