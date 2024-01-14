package com.sudoku.sudokuAssembly.entity;

import javax.persistence.*;
import java.util.UUID;

@Table(name = "sudoku_tracker")
@Entity
public class SudokuProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "sudoku_id")
    private UUID sudokuId;

    @Column(name = "username")
    private String username;

    @Column(name = "time_spent")
    private long timeSpent;

    @Column(name = "solved")
    private boolean solved;

    @Column(name = "incorrects")
    private int incorrects;

    public SudokuProgress(){}
    public SudokuProgress(UUID id, UUID sudokuId, String username, int timeSpent, boolean solved, int incorrects) {
        this.id = id;
        this.sudokuId = sudokuId;
        this.username = username;
        this.timeSpent = timeSpent;
        this.solved = solved;
        this.incorrects = incorrects;
    }

    public SudokuProgress(UUID sudokuId, String username, int timeSpent, boolean solved, int incorrects) {
        this.sudokuId = sudokuId;
        this.username = username;
        this.timeSpent = timeSpent;
        this.solved = solved;
        this.incorrects = incorrects;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getSudokuId() {
        return sudokuId;
    }

    public void setSudokuId(UUID sudokuId) {
        this.sudokuId = sudokuId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(long timeSpent) {
        this.timeSpent = timeSpent;
    }

    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }

    public int getIncorrects() {
        return incorrects;
    }

    public void setIncorrects(int incorrects) {
        this.incorrects = incorrects;
    }
}
