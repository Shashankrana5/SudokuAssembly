package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.UserRepository;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    public User saveUser(User user){
        return userRepository.save(user);
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public void deleteUser(UUID id){userRepository.deleteById(id);}
}
