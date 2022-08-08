package com.sudoku.sudokuAssembly.service;

import com.sudoku.sudokuAssembly.entity.Sudoku;

import java.util.ArrayList;
import java.util.Optional;

public interface SudokuService {
    ArrayList<Sudoku> findAllSudoku();
    Optional<Sudoku> findById(String id);
    Sudoku saveSudoku(Sudoku sudoku);
    Sudoku updateSudoku(Sudoku sudoku);
    void deleteSudoku(Sudoku sudoku);
}
