package com.sudoku.sudokuAssembly.service;

import com.sudoku.sudokuAssembly.entity.CustomUserDetails;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

        user.orElseThrow(() -> new UsernameNotFoundException("Not found" + username));

        return user.map(CustomUserDetails::new).get();
    }
}
