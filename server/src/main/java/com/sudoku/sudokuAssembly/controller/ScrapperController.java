package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.service.ScrapperService;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ScrapperController {

    private final ScrapperService scrapperService;
    private final SudokuService sudokuService;


    @Autowired
    public ScrapperController(ScrapperService scrapperService, SudokuService sudokuService) {
        this.scrapperService = scrapperService;
        this.sudokuService = sudokuService;
    }

    @GetMapping("/scrape")
    @Cacheable(cacheNames = "allSudokus")
    public ArrayList<Sudoku> scrape() throws IOException {
        scrapperService.scrape();
        return (ArrayList<Sudoku>) sudokuService.findAllSudoku();
    }
}

