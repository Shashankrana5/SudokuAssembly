package com.sudoku.sudokuAssembly.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.sudoku.sudokuAssembly.entity.ERole;
import com.sudoku.sudokuAssembly.entity.Role;
import com.sudoku.sudokuAssembly.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@DataJpaTest
class RoleRepositoryTest {

    @Mock
    private RoleRepository roleRepository;

    @Test
    void findByName() {
        ERole roleName = ERole.ROLE_USER;

        Role expectedRole = new Role();
        when(roleRepository.findByName(roleName)).thenReturn(Optional.of(expectedRole));

        Optional<Role> result = roleRepository.findByName(roleName);

        assertEquals(Optional.of(expectedRole), result);
    }

    // Add more tests for other repository methods as needed
}
