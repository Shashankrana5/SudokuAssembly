package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.dto.JwtResponse;
import com.sudoku.sudokuAssembly.dto.SignInRequest;
import com.sudoku.sudokuAssembly.dto.SignUpRequest;
import com.sudoku.sudokuAssembly.entity.ERole;
import com.sudoku.sudokuAssembly.entity.Role;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.RoleRepository;
import com.sudoku.sudokuAssembly.repository.UserRepository;
import com.sudoku.sudokuAssembly.service.UserDetailsImpl;
import com.sudoku.sudokuAssembly.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import org.mockito.Mockito;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @Test
    void demoLogin() {
        SignInRequest signInRequest = new SignInRequest("DemoUser", "demouserpassword");

        ResponseEntity<?> responseEntity = authController.demoLogin();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        // Add more assertions as needed
    }

    @Test
    void signin() {
        SignInRequest signInRequest = new SignInRequest("username", "password");
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(jwtUtil.generateJwtToken(authentication)).thenReturn("mockedJwtToken");

        UserDetailsImpl userDetails = new UserDetailsImpl(UUID.randomUUID(), "username", "password", "email", Collections.emptyList());
        when(authentication.getPrincipal()).thenReturn(userDetails);

        ResponseEntity<?> responseEntity = authController.signin(signInRequest);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        JwtResponse jwtResponse = (JwtResponse) responseEntity.getBody();
        assertEquals("mockedJwtToken", jwtResponse.getToken());
    }

    @Test
    void signup() {
        SignUpRequest signUpRequest = new SignUpRequest("newUser", "newUser@example.com", "John", "Doe", "password");

        when(userRepository.existsByUsername(signUpRequest.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(signUpRequest.getEmail())).thenReturn(false);

        when(roleRepository.findByName(ERole.ROLE_USER)).thenReturn(Optional.of(new Role()));

        when(passwordEncoder.encode(signUpRequest.getPassword())).thenReturn("hashedPassword");

        Set<Role> roles = Collections.singleton(new Role());
        when(userRepository.save(any(User.class))).thenReturn(new User(UUID.randomUUID(), "newUser", "newUser@example.com", "John", "Doe", "hashedPassword", 0, new HashSet<>(), new ArrayList<>(), roles));

        ResponseEntity<?> responseEntity = authController.signup(signUpRequest);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
}
