package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@RestController
public class SudokuController {

    private SudokuController(SudokuService sudokuService){
        this.sudokuService = sudokuService;
    }
    @Autowired
    private final SudokuService sudokuService;

    @GetMapping("/search")
    public ArrayList<Sudoku> findAllSudoku(){
        return sudokuService.findAllSudoku();
    }
    @GetMapping("/search/{id}")
    public Optional<Sudoku> findById(@PathVariable UUID id){
        return sudokuService.findById(id);
    }
    @PostMapping("/")
    public Sudoku saveSudoku(@RequestBody Sudoku sudoku){
        return sudokuService.saveSudoku(sudoku);
    }

    @PutMapping("/")
    public Sudoku updateSudoku(Sudoku sudoku){
        return sudokuService.updateSudoku(sudoku);
    }
    @DeleteMapping("/")
    public void deleteSudoku(Sudoku sudoku){
        sudokuService.deleteSudoku(sudoku);
    }
}
