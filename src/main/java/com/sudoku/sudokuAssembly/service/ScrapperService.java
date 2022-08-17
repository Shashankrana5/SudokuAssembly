package com.sudoku.sudokuAssembly.service;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import org.jsoup.nodes.Element;

import java.io.IOException;
import java.util.ArrayList;

public interface ScrapperService {
    Sudoku scrape() throws IOException;

}
