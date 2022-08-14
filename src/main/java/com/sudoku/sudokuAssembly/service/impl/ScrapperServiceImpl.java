package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.service.ScrapperService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;

@Service
public class ScrapperServiceImpl implements ScrapperService {


    public ArrayList<Element> scrape() throws IOException {
        String url = "https://www.nytimes.com/puzzles/sudoku/easy";
        Document doc = Jsoup.connect(url).get();

        Elements values = doc.getElementsByAttribute("su-cell");
        ArrayList<Element> al = new ArrayList<>(values);
        return al;
    }
}