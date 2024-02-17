package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        reset(userRepository, bCryptPasswordEncoder);
    }

    @Test
    void findAll_shouldReturnUsersList() {
        // Mock UserRepository to return a list of users
        when(userRepository.findAll()).thenReturn(Collections.singletonList(createMockUser()));

        // Test
        List<User> result = userService.findAll();

        // Verify UserRepository is called
        verify(userRepository, times(1)).findAll();

        // Verify result
        assertFalse(result.isEmpty());
        assertEquals(Collections.singletonList(createMockUser()), result);
    }

    @Test
    void saveUser_shouldEncodePasswordAndReturnUser() {
        // Mock UserRepository to return the user
        when(userRepository.save(any(User.class))).thenReturn(createMockUser());

        // Mock BCryptPasswordEncoder to return the encoded password
        when(bCryptPasswordEncoder.encode(any(CharSequence.class))).thenReturn("encodedPassword");

        // Test
        User user = new User(UUID.randomUUID(), "testUser", "test@example.com", "password", "John", "Doe", 0, new HashSet<>(), new ArrayList<>(), new HashSet<>());
        User result = userService.saveUser(user);

        // Verify UserRepository is called
        verify(userRepository, times(1)).save(user);

        // Verify BCryptPasswordEncoder is called
        verify(bCryptPasswordEncoder, times(1)).encode("password");

        // Verify result
        assertNotNull(result);
        assertEquals(createMockUser(), result);
        assertEquals("encodedPassword", result.getPassword());
    }

    // Add more tests for other methods in UserServiceImpl if needed

    private User createMockUser() {
        return new User(UUID.randomUUID(), "testUser", "test@example.com", "encodedPassword", "John", "Doe", 0, new HashSet<>(), new ArrayList<>(), new HashSet<>());
    }
}
