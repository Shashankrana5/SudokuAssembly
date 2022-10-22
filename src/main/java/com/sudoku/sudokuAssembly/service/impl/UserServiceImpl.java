package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.UserRepository;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    protected UserServiceImpl(UserRepository userRepository){this.userRepository = userRepository;}

    @Override
    public List<User> findAll(){
       return userRepository.findAll();
    }

    @Override
    public User saveUser(User user){
        return userRepository.save(user);
    }
}