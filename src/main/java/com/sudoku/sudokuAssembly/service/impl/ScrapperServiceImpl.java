package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.service.ScrapperService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ScrapperServiceImpl implements ScrapperService {


    public void scrape() throws IOException {
        String url = "https://www.nytimes.com/puzzles/sudoku/easy";
        Document doc = Jsoup.connect(url).get();

        Elements values = doc.getElementsByAttribute("su-cell");
        for (Element value: values){
            System.out.println(value);
        }
    }
}