package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.repository.SudokuRepository;
import com.sudoku.sudokuAssembly.service.ScrapperService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;

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
        int easy = elements.get(2).toString().indexOf("easy");
        int hard = elements.get(2).toString().indexOf("hard");
        int medium =  elements.get(2).toString().indexOf("medium");

        int date_index = elements.get(2).toString().indexOf("print_date");
        String date = elements.get(2).toString().substring(date_index+ 13, date_index+ 23);
//        String date = elements.get(2).toString().substring(date_index+ 21, date_index + 23) + "-" + elements.get(2).toString().substring(date_index + 18, date_index + 20) + "-" +elements.get(2).toString().substring(date_index + 13, date_index + 17);
        String[] result;


        result = parseData(easy, elements);

        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date + "-NewYorkTimes", result[0], "easy", "New York", date, result[1]));

        result = parseData(medium, elements);
        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date + "-NewYorkTimes", result[0], "medium", "New York", date, result[1]));

        result = parseData(hard, elements);

        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date + "-NewYorkTimes", result[0], "hard", "New York", date, result[1]));


//        System.out.println(elements.get(2).toString().indexOf("\"puzzle\":"));
//
//        System.out.println(elements.get(2).toString().indexOf("solution"));




//        Document document = Jsoup.connect(url).get();
//
//        String data = document.getElementsByTag("script")
//                .attr("type", "text/javascript")
//                .first()
//                .data();
//        String date = data.substring(data.indexOf("print_date")+13, data.indexOf("print_date")+23);
//
//        int medium = data.indexOf("medium");
//        int hard = data.indexOf("hard");
//        String[] res = findPuzzleAndSolution(data.substring(hard-350, hard));
//        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date+"-NewYorkTimes",res[0], "easy", "New York", date,res[1]));
//
//        res = findPuzzleAndSolution(data.substring(data.length() - 350));
//        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date+"-NewYorkTimes",res[0], "medium", "New York", date,res[1]));
//
//        res = findPuzzleAndSolution(data.substring(medium-350, medium));
//        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date+"-NewYorkTimes",res[0], "hard", "New York", date,res[1]));


//        sudokuRepository.save(new Sudoku(UUID.randomUUID(), date+"-NewYorkTimes",res[0], "easy", "New York", date,res[1]));
//        return sudokuRepository.save(new Sudoku(UUID.randomUUID(), date+"-NewYorkTimes",res[0], "easy", "New York", date,res[1]));

    }

    private String[] findPuzzleAndSolution(String valueOfRawData){
        int start = valueOfRawData.indexOf("[");
        int end = valueOfRawData.lastIndexOf("[");
        String puzzle = valueOfRawData.substring(start+1, start+162);
        String solution = valueOfRawData.substring(end+1, end+162);
        return new String[]{puzzle, solution};

    }


    private String[] parseData(int index, Elements elements){
        String init_data = elements.get(2).toString().substring(index, index + 690);
//        System.out.println(init_data);
//
        int puzzleIndex = init_data.indexOf("\"puzzle\":");
        String puzzle = init_data.substring(puzzleIndex+10, puzzleIndex + 161+10);

        int solutionIndex = init_data.indexOf("\"solution\":");
        String solution = init_data.substring(solutionIndex+12, solutionIndex + 161+12);

        return new String[]{puzzle, solution};

    }

}