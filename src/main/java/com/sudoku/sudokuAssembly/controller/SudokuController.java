package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Controller
public class SudokuController {

    @Autowired
    private SudokuController(SudokuService sudokuService){
        this.sudokuService = sudokuService;
    }
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

    @GetMapping("/testing")
    String getPeople(Model model) {

        model.addAttribute("testingValue", sudokuService.findAllSudoku());

        return "homepage";
    }

    @GetMapping("thytest")
    String thytesting(){
        return "testing_index";
    }

    @GetMapping("/puzzle")
    String getVariables(Model model){
        String va = sudokuService.getTheId();
        model.addAttribute("puzzle", va);
        return "index";
    }
}
