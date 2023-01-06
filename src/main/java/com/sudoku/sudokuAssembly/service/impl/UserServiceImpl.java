package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.UserRepository;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    protected UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder){this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public List<User> findAll(){
       return userRepository.findAll();
    }

    @Override
    public User saveUser(User user){

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public User findById(UUID id){
        return userRepository.findById(id).orElse(new User());
    }
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }
}