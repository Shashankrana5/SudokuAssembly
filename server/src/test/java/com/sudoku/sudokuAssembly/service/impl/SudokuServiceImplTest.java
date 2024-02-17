package com.sudoku.sudokuAssembly.service.impl;


import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.repository.SudokuRepository;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class SudokuServiceImplTest {

    @Mock
    private SudokuRepository sudokuRepository;

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @InjectMocks
    private SudokuServiceImpl sudokuService;

    @BeforeEach
    void setUp() {
        reset(sudokuRepository, redisTemplate);
    }

    @Test
    void findAllSudoku_shouldReturnCachedData() {
        // Mock RedisTemplate to return cached data
        when(redisTemplate.opsForValue().get("sudokus")).thenReturn(createMockSudokuList());

        // Test
        List<Sudoku> result = sudokuService.findAllSudoku();

        // Verify RedisTemplate is called, and repository is not called
        verify(redisTemplate, times(1)).opsForValue().get("sudokus");
        verify(sudokuRepository, never()).findAll();

        // Verify result
        assertNotNull(result);
        assertEquals(createMockSudokuList(), result);
    }

    @Test
    void findAllSudoku_shouldReturnRepositoryData_andCacheIt() {
        // Mock RedisTemplate to return null (no cached data)
        when(redisTemplate.opsForValue().get("sudokus")).thenReturn(null);

        // Mock repository to return data
        when(sudokuRepository.findAll()).thenReturn(createMockSudokuList());

        // Test
        List<Sudoku> result = sudokuService.findAllSudoku();

        // Verify RedisTemplate is called to check cache, repository is called to fetch data, and RedisTemplate is called to cache data
        verify(redisTemplate, times(1)).opsForValue().get("sudokus");
        verify(sudokuRepository, times(1)).findAll();
        verify(redisTemplate, times(1)).opsForValue().set("sudokus", createMockSudokuList());

        // Verify result
        assertNotNull(result);
        assertEquals(createMockSudokuList(), result);
    }

    // Add more tests for other methods in SudokuServiceImpl if needed

    private List<Sudoku> createMockSudokuList() {
        Sudoku sudoku1 = new Sudoku(UUID.randomUUID(), "2022-02-17", "puzzle1", "easy", "source1", "2022-02-17", "solution1");
        Sudoku sudoku2 = new Sudoku(UUID.randomUUID(), "2022-02-18", "puzzle2", "medium", "source2", "2022-02-18", "solution2");
        return Arrays.asList(sudoku1, sudoku2);
    }
}