package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.service.ScrapperService;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@CrossOrigin("*")
public class ScrapperController {

    private final ScrapperService scrapperService;
    private final SudokuService sudokuService;


    @Autowired
    public ScrapperController(ScrapperService scrapperService, SudokuService sudokuService) {
        this.scrapperService = scrapperService;
        this.sudokuService = sudokuService;
    }

    @GetMapping("/scrape")
    public void scrape() throws IOException {
        scrapperService.scrape();

    }

    @GetMapping("/reactingtesting")
    public ArrayList<Sudoku> reactingtesting(){
        return sudokuService.findAllSudoku();
    }
}

