package com.sudoku.sudokuAssembly.service;

import com.sudoku.sudokuAssembly.entity.Sudoku;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface SudokuService {
    ArrayList<Sudoku> findAllSudoku();
//    Sudoku findById(String id);
    Sudoku findByDateAndSource();
    Sudoku saveSudoku(Sudoku sudoku);
    Sudoku updateSudoku(Sudoku sudoku);
    void deleteSudoku(Sudoku sudoku);
    String getPuzzleFromDateAndLevel();
    String getSolutionFromDateAndLevel();
    Collection<Sudoku> getA(String testing_date);
    Sudoku findByDateAndLevel(String date, String level);
    Sudoku findById(UUID id);
    boolean exists(String date, String level);
    public Sudoku updateAttempt(Sudoku sudoku);

    void deleteSudokuById(UUID sudokuId);
}
