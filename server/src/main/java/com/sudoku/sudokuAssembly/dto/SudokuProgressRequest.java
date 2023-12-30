package com.sudoku.sudokuAssembly.dto;

import java.util.UUID;

public class SudokuProgressRequest {
    private String username;
    private int incorrects;
    private UUID sudokuId;
    private int timeSpent;
    private boolean solved;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getIncorrects() {
        return incorrects;
    }

    public void setIncorrects(int incorrects) {
        this.incorrects = incorrects;
    }

    public UUID getSudokuId() {
        return sudokuId;
    }

    public void setSudokuId(UUID sudokuId) {
        this.sudokuId = sudokuId;
    }

    public int getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(int timeSpent) {
        this.timeSpent = timeSpent;
    }

    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }
}
