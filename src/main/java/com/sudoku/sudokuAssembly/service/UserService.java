package com.sudoku.sudokuAssembly.service;

import com.sudoku.sudokuAssembly.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {

    User saveUser(User user);
    List<User> getAll();
    void deleteUser(UUID id);
}
