package com.sudoku.sudokuAssembly.repository;

import static org.junit.jupiter.api.Assertions.*;
import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import com.sudoku.sudokuAssembly.repository.SudokuProgressRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@DataJpaTest
class SudokuProgressRepositoryTest {

    @Mock
    private SudokuProgressRepository sudokuProgressRepository;

    @Test
    void getProgressOfSudokuAndUser() {
        UUID userId = UUID.randomUUID();
        UUID sudokuId = UUID.randomUUID();

        SudokuProgress expectedProgress = new SudokuProgress();
        when(sudokuProgressRepository.getProgressOfSudokuAndUser(userId, sudokuId)).thenReturn(expectedProgress);

        SudokuProgress result = sudokuProgressRepository.getProgressOfSudokuAndUser(userId, sudokuId);

        assertEquals(expectedProgress, result);
    }

    @Test
    void getSudokuProgressesByUsernameAndSudokuId() {
        String username = "testUser";
        UUID sudokuId = UUID.randomUUID();

        SudokuProgress expectedProgress = new SudokuProgress();
        when(sudokuProgressRepository.getSudokuProgressesByUsernameAndSudokuId(username, sudokuId)).thenReturn(expectedProgress);

        SudokuProgress result = sudokuProgressRepository.getSudokuProgressesByUsernameAndSudokuId(username, sudokuId);

        assertEquals(expectedProgress, result);
    }

}
