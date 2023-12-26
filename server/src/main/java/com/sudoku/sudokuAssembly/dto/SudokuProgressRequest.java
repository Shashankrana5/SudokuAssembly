package com.sudoku.sudokuAssembly.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SudokuProgressRequest {
    private String username;
    private int incorrects;
    private UUID sudokuId;
    private int timeSpent;
    private boolean solved;

}
