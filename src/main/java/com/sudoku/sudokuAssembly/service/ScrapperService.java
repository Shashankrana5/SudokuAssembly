package com.sudoku.sudokuAssembly.service;

import org.jsoup.nodes.Element;

import java.io.IOException;
import java.util.ArrayList;

public interface ScrapperService {
    ArrayList<Element> scrape() throws IOException;
}
