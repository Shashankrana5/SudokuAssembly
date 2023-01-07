package com.sudoku.sudokuAssembly.service;

import com.sudoku.sudokuAssembly.entity.SudokuProgress;

import java.util.List;
import java.util.UUID;

public interface SudokuProgressService {

    SudokuProgress addSudokuProgress(SudokuProgress sudokuProgress);
    SudokuProgress getProgressOfSudokuAndUser(UUID userId, UUID sudokuId);
    SudokuProgress updateSudokuProgress(SudokuProgress sudokuProgress);
    List<SudokuProgress> findAllProgress();

}
