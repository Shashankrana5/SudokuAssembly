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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          RoleRepository roleRepository,
                          AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/demologin")
    public ResponseEntity<?> demoLogin(){

        return signin(new SignInRequest("DemoUser", "demouserpassword"));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInRequest signInRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        JwtResponse res = new JwtResponse();
        res.setToken(jwt);
        res.setEmail(userDetails.getEmail());
        res.setId(userDetails.getId());
        res.setUsername(userDetails.getUsername());
        res.setRoles(roles);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken");
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken");
        }

        String hashedPassword = passwordEncoder.encode(signUpRequest.getPassword());
        Set<Role> roles = new HashSet<>();
        Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);
        if (userRole.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role not found");
        }

        roles.add(userRole.get());

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPassword(hashedPassword);
        user.setRoles(roles);

        userRepository.save(user);
        return signin(new SignInRequest(signUpRequest.getUsername(), signUpRequest.getPassword()));

    }
}