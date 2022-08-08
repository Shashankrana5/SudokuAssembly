package com.sudoku.sudokuAssembly.entity;

import javax.persistence.*;

@Entity
@Table(name = "a_sudoku")
public class Sudoku {
    @Id
    @Column(name = "id")
    String date_and_source;

    @Column(name = "puzzle")
    String puzzle;

    @Column(name = "level")
    String level;

    @Column(name = "solution")
    String solution;

    @Column(name = "source")
    String source;

    @Column(name = "date")
    String date;

    // Blank constructor
    public Sudoku(){}

    // Constructor
    public Sudoku(String date_and_source, String puzzle, String level){
        this.date_and_source = date_and_source;
        this.puzzle = puzzle;
        this.level = level;
    }

    public String getDate_and_source() {
        return date_and_source;
    }

    public void setDate_and_source(String date_and_source) {
        this.date_and_source = date_and_source;
    }

    // Getters and setters for all the variables:

    public String getPuzzle() {
        return puzzle;
    }

    public void setPuzzle(String puzzle) {
        this.puzzle = puzzle;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
