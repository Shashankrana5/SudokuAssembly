package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.service.ScrapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ScrapperController {

    @Autowired
    private final ScrapperService scrapperService;

    public ScrapperController(ScrapperService scrapperService) {
        this.scrapperService = scrapperService;
    }

    @GetMapping("/scrape")
    public void scrape() throws IOException {
        scrapperService.scrape();
    }
}
