package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import com.sudoku.sudokuAssembly.repository.SudokuProgressRepository;
import com.sudoku.sudokuAssembly.service.SudokuProgressService;
import com.sudoku.sudokuAssembly.service.impl.SudokuProgressServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
class SudokuProgressServiceImplTest {

    @Mock
    private SudokuProgressRepository sudokuProgressRepository;

    @InjectMocks
    private SudokuProgressServiceImpl sudokuProgressService;

    @Test
    void addSudokuProgress() {
        SudokuProgress sudokuProgress = new SudokuProgress();
        when(sudokuProgressRepository.save(any(SudokuProgress.class))).thenReturn(sudokuProgress);

        SudokuProgress result = sudokuProgressService.addSudokuProgress(sudokuProgress);

        assertNotNull(result);
        assertEquals(sudokuProgress, result);
        verify(sudokuProgressRepository, times(1)).save(any(SudokuProgress.class));
    }

    @Test
    void getProgressOfSudokuAndUser_found() {
        UUID userId = UUID.randomUUID();
        UUID sudokuId = UUID.randomUUID();
        SudokuProgress expectedProgress = new SudokuProgress();

        when(sudokuProgressRepository.getProgressOfSudokuAndUser(userId, sudokuId)).thenReturn(expectedProgress);

        SudokuProgress result = sudokuProgressService.getProgressOfSudokuAndUser(userId, sudokuId);

        assertNotNull(result);
        assertEquals(expectedProgress, result);
        verify(sudokuProgressRepository, times(1)).getProgressOfSudokuAndUser(userId, sudokuId);
    }

    @Test
    void getProgressOfSudokuAndUser_notFound() {
        UUID userId = UUID.randomUUID();
        UUID sudokuId = UUID.randomUUID();

        when(sudokuProgressRepository.getProgressOfSudokuAndUser(userId, sudokuId)).thenReturn(null);

        SudokuProgress result = sudokuProgressService.getProgressOfSudokuAndUser(userId, sudokuId);

        assertNotNull(result);
        assertEquals(new SudokuProgress(), result);
        verify(sudokuProgressRepository, times(1)).getProgressOfSudokuAndUser(userId, sudokuId);
    }

    @Test
    void findAllProgress() {
        List<SudokuProgress> expectedList = Collections.singletonList(new SudokuProgress());

        when(sudokuProgressRepository.findAll()).thenReturn(expectedList);

        List<SudokuProgress> result = sudokuProgressService.findAllProgress();

        assertNotNull(result);
        assertEquals(expectedList, result);
        verify(sudokuProgressRepository, times(1)).findAll();
    }

    @Test
    void getProgressByUsernameAndSudokuId() {
        UUID sudokuId = UUID.randomUUID();
        String username = "testUser";
        SudokuProgress expectedProgress = new SudokuProgress();

        when(sudokuProgressRepository.getSudokuProgressesByUsernameAndSudokuId(username, sudokuId)).thenReturn(expectedProgress);

        SudokuProgress result = sudokuProgressService.getProgressByUsernameAndSudokuId(username, sudokuId);

        assertNotNull(result);
        assertEquals(expectedProgress, result);
        verify(sudokuProgressRepository, times(1)).getSudokuProgressesByUsernameAndSudokuId(username, sudokuId);
    }

    @Test
    void updateSudokuProgress_existing() {
        UUID sudokuId = UUID.randomUUID();
        SudokuProgress existingProgress = new SudokuProgress();
        existingProgress.setUsername("testUser");

        SudokuProgress updatedProgress = new SudokuProgress();
        updatedProgress.setUsername("testUser");
        updatedProgress.setSolved(true);

        when(sudokuProgressRepository.getSudokuProgressesByUsernameAndSudokuId("testUser", sudokuId)).thenReturn(existingProgress);
        when(sudokuProgressRepository.save(existingProgress)).thenReturn(existingProgress);

        SudokuProgress result = sudokuProgressService.updateSudokuProgress(updatedProgress);

        assertNotNull(result);
        assertEquals(existingProgress, result);
        assertTrue(result.isSolved());
        verify(sudokuProgressRepository, times(1)).getSudokuProgressesByUsernameAndSudokuId("testUser", sudokuId);
        verify(sudokuProgressRepository, times(1)).save(existingProgress);
    }

    @Test
    void updateSudokuProgress_new() {
        UUID sudokuId = UUID.randomUUID();
        SudokuProgress updatedProgress = new SudokuProgress();
        updatedProgress.setUsername("testUser");
        updatedProgress.setSolved(true);

        when(sudokuProgressRepository.getSudokuProgressesByUsernameAndSudokuId("testUser", sudokuId)).thenReturn(null);
        when(sudokuProgressRepository.save(updatedProgress)).thenReturn(updatedProgress);

        SudokuProgress result = sudokuProgressService.updateSudokuProgress(updatedProgress);

        assertNotNull(result);
        assertEquals(updatedProgress, result);
        assertTrue(result.isSolved());
        verify(sudokuProgressRepository, times(1)).getSudokuProgressesByUsernameAndSudokuId("testUser", sudokuId);
        verify(sudokuProgressRepository, times(1)).save(updatedProgress);
    }
}
