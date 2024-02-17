package com.sudoku.sudokuAssembly.repository;

import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DataJpaTest
class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    @Test
    void findByUsername() {
        String username = "testUser";

        User expectedUser = new User();
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(expectedUser));

        Optional<User> result = userRepository.findByUsername(username);

        assertEquals(Optional.of(expectedUser), result);
    }

    @Test
    void findByEmail() {
        String email = "test@example.com";

        User expectedUser = new User();
        when(userRepository.findByEmail(email)).thenReturn(expectedUser);

        User result = userRepository.findByEmail(email);

        assertEquals(expectedUser, result);
    }

    @Test
    void existsByUsername() {
        String existingUsername = "existingUser";
        String nonExistingUsername = "nonExistingUser";

        when(userRepository.existsByUsername(existingUsername)).thenReturn(true);
        when(userRepository.existsByUsername(nonExistingUsername)).thenReturn(false);

        assertTrue(userRepository.existsByUsername(existingUsername));
        assertFalse(userRepository.existsByUsername(nonExistingUsername));
    }

    @Test
    void existsByEmail() {
        String existingEmail = "existing@example.com";
        String nonExistingEmail = "nonExisting@example.com";

        when(userRepository.existsByEmail(existingEmail)).thenReturn(true);
        when(userRepository.existsByEmail(nonExistingEmail)).thenReturn(false);

        assertTrue(userRepository.existsByEmail(existingEmail));
        assertFalse(userRepository.existsByEmail(nonExistingEmail));
    }

    // Add more tests for other repository methods as needed
}
