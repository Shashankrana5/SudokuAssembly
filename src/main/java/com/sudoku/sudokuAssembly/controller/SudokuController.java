package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Controller
public class SudokuController {

    @Autowired
    private SudokuController(SudokuService sudokuService){
        this.sudokuService = sudokuService;
    }
    private final SudokuService sudokuService;

    @GetMapping("/search")
    public ArrayList<Sudoku> findAllSudoku(){
        return sudokuService.findAllSudoku();
    }
//    @GetMapping("/search/{id}")
//    public Sudoku findById(@PathVariable UUID id){
//        return sudokuService.findById(id.toString());
//    }
    @PostMapping("/")
    public Sudoku saveSudoku(@RequestBody Sudoku sudoku){
        return sudokuService.saveSudoku(sudoku);
    }

    @PutMapping("/")
    public Sudoku updateSudoku(Sudoku sudoku){
        return sudokuService.updateSudoku(sudoku);
    }
    @DeleteMapping("/")
    public void deleteSudoku(Sudoku sudoku){
        sudokuService.deleteSudoku(sudoku);
    }
//
//    @GetMapping("/testing")
//    String getPeople(Model model) {
//
//        model.addAttribute("allSudoku", sudokuService.findAllSudoku());
//        model.addAttribute("a", sudokuService.getA());
//        return "home";
//    }

    @GetMapping("thytest")
    String thytesting(Model model){
        String testing_date = "5f9dffd2-c815-4613-a604-dc17a0fb3764";
//        String testing_diff = "easy";
//        String puzzle = sudokuService.getPuzzleFromDateAndLevel();
//        String solution = sudokuService.getSolutionFromDateAndLevel();
        model.addAttribute("test_sudoku", sudokuService.getA(testing_date));
//        model.addAttribute("puzzle", puzzle);
//        model.addAttribute("solution", solution);

        return "testing_index";
    }

    @GetMapping("/puzzle")
    String getVariables(Model model){
        String va = sudokuService.getTheId();
        model.addAttribute("puzzle", va);
        return "index";
    }

    @GetMapping("/home")
    String home(Model model){
        model.addAttribute("allSudoku", sudokuService.findAllSudoku());

        return "home";
    }

    @GetMapping("sudoku/{dateAndLevel}")
    String thesudokuboard(Model model, @PathVariable(name = "dateAndLevel") String dateAndLevel){


        String date = dateAndLevel.substring(0, 10);
        String level = dateAndLevel.substring(11);

        Sudoku returned_value = sudokuService.findByDateAndLevel(date, level);
        model.addAttribute("test_passing", returned_value.getPuzzle());
        model.addAttribute("puzzle", returned_value.getPuzzle());
        model.addAttribute("solution", returned_value.getSolution());

        return "sudokuPuzzle";
    }


}
