package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.service.ScrapperService;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;

@RestController
public class ScrapperController {

    public ScrapperController(ScrapperService scrapperService) {
    this.scrapperService = scrapperService;
}
    @Autowired
    private final ScrapperService scrapperService;



    @GetMapping("/scrape")
    public ArrayList<Element> scrape() throws IOException {
        return scrapperService.scrape();
    }
}
