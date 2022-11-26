package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.repository.SudokuRepository;
import com.sudoku.sudokuAssembly.service.ScrapperService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ScrapperServiceImpl implements ScrapperService {

    private final SudokuRepository sudokuRepository;
    private ScrapperServiceImpl(SudokuRepository sudokuRepository){
        this.sudokuRepository = sudokuRepository;
    }

    @Override
    public void scrape() throws IOException {
        newYorkTimes();
    }


    public void newYorkTimes() throws IOException {
        String url = "https://www.nytimes.com/puzzles/sudoku/easy";

        Document document = Jsoup.connect(url).get();

        Elements elements = document
                .getElementsByTag("script")
                .attr("type", "text/javascript");

        List<String> puzzleList = new ArrayList<>();


        String scrapeData = elements.get(2).toString();
        Pattern p = Pattern.compile("[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+,[0-9]+");
        Matcher m = p.matcher(scrapeData);
        while (m.find()) {
            puzzleList.add(m.group());
        }
        int date_index = elements.get(2).toString().indexOf("print_date");
        String date = elements.get(2).toString().substring(date_index + 13, date_index + 23);

        //Adding sudokus:
        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date + "-NewYorkTimes", puzzleList.get(0), "easy", "New York", date, puzzleList.get(1)));
        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date + "-NewYorkTimes", puzzleList.get(4), "medium", "New York", date, puzzleList.get(5)));
        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date + "-NewYorkTimes", puzzleList.get(2), "hard", "New York", date, puzzleList.get(3)));



    }
}