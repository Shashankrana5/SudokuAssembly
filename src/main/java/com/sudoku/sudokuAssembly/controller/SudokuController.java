package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class SudokuController {

    private SudokuController(SudokuService sudokuService){
        this.sudokuService = sudokuService;
    }
    @Autowired
    private final SudokuService sudokuService;

    @GetMapping("/")
    public ArrayList<Sudoku> findAllSudoku(){
        return sudokuService.findAllSudoku();
    }
    @PostMapping("/")
    public Sudoku saveSudoku(@RequestBody Sudoku sudoku){
        return sudokuService.saveSudoku(sudoku);
    }
}
