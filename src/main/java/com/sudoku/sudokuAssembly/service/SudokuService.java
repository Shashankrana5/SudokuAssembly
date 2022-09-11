package com.sudoku.sudokuAssembly.service;

import com.sudoku.sudokuAssembly.entity.Sudoku;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

public interface SudokuService {
    ArrayList<Sudoku> findAllSudoku();
    Optional<Sudoku> findById(UUID id);
    Sudoku findByDateAndSource();
    Sudoku saveSudoku(Sudoku sudoku);
    Sudoku updateSudoku(Sudoku sudoku);
    void deleteSudoku(Sudoku sudoku);
    String getTheId();


    }
