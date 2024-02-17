package com.sudoku.sudokuAssembly.controller;

import static org.junit.jupiter.api.Assertions.*;

import com.sudoku.sudokuAssembly.controller.SudokuProgressController;
import com.sudoku.sudokuAssembly.dto.SudokuProgressRequest;
import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import com.sudoku.sudokuAssembly.service.SudokuProgressService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class SudokuProgressControllerTest {

    @InjectMocks
    private SudokuProgressController sudokuProgressController;

    @Mock
    private SudokuProgressService sudokuProgressService;

    @Test
    void findAllProgress() {
        List<SudokuProgress> progressList = List.of(new SudokuProgress(), new SudokuProgress());
        when(sudokuProgressService.findAllProgress()).thenReturn(progressList);

        List<SudokuProgress> result = sudokuProgressController.findAllProgress();

        assertEquals(progressList, result);
    }

    @Test
    void addProgress() {
        SudokuProgressRequest request = new SudokuProgressRequest();
        SudokuProgress expectedProgress = new SudokuProgress();
        when(sudokuProgressService.addSudokuProgress(any(SudokuProgress.class))).thenReturn(expectedProgress);

        SudokuProgress result = sudokuProgressController.addProgress(request);

        verify(sudokuProgressService).addSudokuProgress(any(SudokuProgress.class));
        assertEquals(expectedProgress, result);
    }

    @Test
    void updateProgress() {
        SudokuProgressRequest request = new SudokuProgressRequest();
        SudokuProgress expectedProgress = new SudokuProgress();
        when(sudokuProgressService.updateSudokuProgress(any(SudokuProgress.class))).thenReturn(expectedProgress);

        SudokuProgress result = sudokuProgressController.addProgress(request);

        verify(sudokuProgressService).updateSudokuProgress(any(SudokuProgress.class));
        assertEquals(expectedProgress, result);
    }

    @Test
    void getSudokuProgressByUsername() {
        String username = "testUser";
        UUID sudokuId = UUID.randomUUID();
        SudokuProgress expectedProgress = new SudokuProgress();
        when(sudokuProgressService.getProgressByUsernameAndSudokuId(username, sudokuId)).thenReturn(expectedProgress);

        ResponseEntity<?> responseEntity = sudokuProgressController.getSudokuProgressByUsername(username, sudokuId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedProgress, responseEntity.getBody());
    }

    // Add more tests for other controller methods as needed
}
