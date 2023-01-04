package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.service.SudokuService;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

//@Controller
@RestController
public class SudokuController {

    @Autowired
    private SudokuController(SudokuService sudokuService, UserService userService) {
        this.sudokuService = sudokuService;
        this.userService = userService;
    }

    @Autowired
    private final SudokuService sudokuService;

    //Remove the user service later:
    @Autowired
    private final UserService userService;

    @GetMapping("/search")
    public ArrayList<Sudoku> findAllSudoku() {
        return sudokuService.findAllSudoku();
    }

    @GetMapping("/search/{id}")
    public Sudoku getSudokuFromId(@PathVariable UUID id){
        return sudokuService.findById(id);
    }

    @PostMapping("/createsudoku")
    public Sudoku saveSudoku(@RequestBody Sudoku sudoku) {
        return sudokuService.saveSudoku(sudoku);
    }

    @PutMapping("/")
    public Sudoku updateSudoku(Sudoku sudoku) {
        return sudokuService.updateSudoku(sudoku);
    }

    @DeleteMapping("/")
    public void deleteSudoku(Sudoku sudoku) {
        sudokuService.deleteSudoku(sudoku);
    }

    @GetMapping("thytest")
    String thytesting(Model model) {
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
    String getVariables(Model model) {
        String va = sudokuService.getTheId();
        model.addAttribute("puzzle", va);
        return "index";
    }

    @GetMapping("/home")
    String home(Model model) {
        model.addAttribute("allSudoku", sudokuService.findAllSudoku());
        return "home";
    }

    @PutMapping("/ss/{userId}/sudokus/{sudokuId}")
    Sudoku sudokuToUser(@PathVariable UUID userId, @PathVariable UUID sudokuId){
        User user = userService.findById(userId);
        Sudoku sudoku = sudokuService.findById(sudokuId);
        sudoku.addUser(user);
        return sudokuService.saveSudoku(sudoku);
    }


    @GetMapping("sudoku/{dateAndLevel}")
    String thesudokuboard(Model model, @PathVariable(name = "dateAndLevel") String dateAndLevel) {

        Map<String, String> monthConverted = Stream.of(new String[][]{
                {"01", "January"},
                {"02", "February"},
                {"03", "March"},
                {"04", "April"},
                {"05", "May"},
                {"06", "June"},
                {"07", "July"},
                {"08", "August"},
                {"09", "September"},
                {"10", "October"},
                {"11", "November"},
                {"12", "December"},
        }).collect(Collectors.toMap(data -> data[0], data -> data[1]));
        String date = dateAndLevel.substring(0, 10);
        String level = dateAndLevel.substring(11);

        Sudoku returned_value = sudokuService.findByDateAndLevel(date, level);
        model.addAttribute("test_passing", returned_value.getPuzzle());
        model.addAttribute("puzzle", returned_value.getPuzzle());
        model.addAttribute("solution", returned_value.getSolution());
        date = monthConverted.get(date.substring(5,7)) + " " + date.substring(8, 10) +", " +date.substring(0,4);
        model.addAttribute("date", date);
        return "sudokuPuzzle";
    }
    // Need to delete these later:

    @GetMapping("/login")
    public String login(){
        return "login";
    }


}
