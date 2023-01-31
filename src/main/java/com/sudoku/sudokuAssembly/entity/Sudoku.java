package com.sudoku.sudokuAssembly.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "sudokus")
public class Sudoku {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;
    @Column(name = "Name")
    private String date_and_source;
    @Column(name = "Puzzle")
    private String puzzle;

    @Column(name = "Level")
    private String level;

    @Column(name = "Solution")
    private String solution;

    @Column(name = "Source")
    private String source;

    @Column(name = "Date")
    private String date;

    //You need to add the adding into the hashset here.
    @ManyToMany()
    @JoinTable(
            name = "users_completed",
            joinColumns = @JoinColumn(name  = "sudoku_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    public Set<User> completed_users = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "attempted_sudokus")
    public List<User> attempted_users = new ArrayList<>();

    // Blank constructor
    public Sudoku(){

    }
    // Constructor
    public Sudoku(UUID id, String date_and_source, String puzzle, String level,
                  String source, String date, String solution, Set<User> completed_users){
        this.id = id;
        this.date_and_source = date_and_source;
        this.puzzle = puzzle;
        this.level = level;
        this.source = source;
        this.date = date;
        this.solution =solution;
        this.completed_users = completed_users;
    }
    public Sudoku(UUID id, String date_and_source, String puzzle, String level,
                  String source, String date, String solution){
        this.id = id;
        this.date_and_source = date_and_source;
        this.puzzle = puzzle;
        this.level = level;
        this.source = source;
        this.date = date;
        this.solution =solution;
        this.completed_users = new HashSet<>();
    }

    public String getDate_and_source() {
        return date_and_source;
    }

    public void setDate_and_source(String date_and_source) {
        this.date_and_source = date_and_source;
    }

    // Getters and setters for all the variables:

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
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

    public void addUser(User user) {
        this.completed_users.add(user);
    }

    public List<User> getAttempted_users() {
        return attempted_users;
    }

    public void setAttempted_users(List<User> attempted_users) {
        this.attempted_users = attempted_users;
    }

    public Sudoku(String date_and_source, String puzzle, String level, String solution, String source, String date, Set<User> completed_users, List<User> attempted_users) {
        this.date_and_source = date_and_source;
        this.puzzle = puzzle;
        this.level = level;
        this.solution = solution;
        this.source = source;
        this.date = date;
        this.completed_users = completed_users;
        this.attempted_users = attempted_users;
    }

    public void addAttempt(User user){
        if (!this.getAttempted_users().contains(user)){
            this.getAttempted_users().add(user);
        }
    }

}

