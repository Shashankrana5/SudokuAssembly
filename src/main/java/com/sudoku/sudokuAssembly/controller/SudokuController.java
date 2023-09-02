package com.sudoku.sudokuAssembly.controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.service.SudokuProgressService;
import com.sudoku.sudokuAssembly.service.SudokuService;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
public class SudokuController {

    @Autowired
    private SudokuController(SudokuProgressService sudokuProgressService, SudokuService sudokuService, UserService userService) {
        this.sudokuProgressService = sudokuProgressService;
        this.sudokuService = sudokuService;
        this.userService = userService;
    }

    @Autowired
    private final SudokuProgressService sudokuProgressService;

    @Autowired
    private final SudokuService sudokuService;

    @Autowired
    private AuthenticationManager authenticationManager;

    //Remove the user service later:
    @Autowired
    private final UserService userService;

    @ResponseBody
    @GetMapping("/search")
    public ArrayList<Sudoku> findAllSudoku() {
        return sudokuService.findAllSudoku();
    }

    @GetMapping("/")
    public String defaultHome(Model model){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userService.findByEmail(email);
        LocalDate today = LocalDate.now();
        user = user.retrieveAndUpdateStreak(today);
        userService.updateLogin(user);

        ArrayList<Sudoku> allSudoku = sudokuService.findAllSudoku();
        model.addAttribute("allSudoku", allSudoku);
        model.addAttribute("firstName", user.getFirstName());
        model.addAttribute("streaks", user.getStreaks());
        return "home";
    }

    @GetMapping("/search/{id}")
    public Sudoku getSudokuFromId(@PathVariable UUID id){
        return sudokuService.findById(id);
    }

    @GetMapping("/register")
    public String register(){
        return "register";
    }
    @GetMapping("/random")
    public String getRandom(){
        Random randomGenerator = new Random();
        ArrayList<Sudoku> allSudokus = sudokuService.findAllSudoku();
        int index = randomGenerator.nextInt(allSudokus.size());
        Sudoku chosenSudoku = allSudokus.get(index);
        return "redirect:/sudoku/" + chosenSudoku.getDate() + "-" + chosenSudoku.getLevel();
    }

    @ResponseBody
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


    @GetMapping("/home")
    String home(Model model) {
        return defaultHome(model);
    }

    @ResponseBody
    @JsonIgnore
    @PutMapping("/addcompletion")
        public Sudoku addCompletion(@RequestBody Map<String,String> sudokuId){
        UUID sudokuID = UUID.fromString(sudokuId.get("sudoku_id"));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Sudoku sudoku = sudokuService.findById(sudokuID);
        User user = userService.findByEmail(email);
        sudoku.addUser(user);
        user.addSudoku(sudoku);

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

        SudokuProgress sudokuProgress = sudokuProgressService.getProgressOfSudokuAndUser(userService.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).getId(), returned_value.getId());
        long timeSpent = 0;
        if (sudokuProgress != null){
            timeSpent = sudokuProgress.getTimeSpent();
        }
        model.addAttribute("test_passing", returned_value.getPuzzle());
        model.addAttribute("puzzle", returned_value.getPuzzle());
        model.addAttribute("solution", returned_value.getSolution());
        date = monthConverted.get(date.substring(5,7)) + " " + date.substring(8, 10) +", " +date.substring(0,4);
        model.addAttribute("date", date);
        model.addAttribute("sudokuId", returned_value.getId().toString());
        model.addAttribute("timeSpent", timeSpent);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userService.findByEmail(email);
        model.addAttribute("firstName", user.getFirstName());
        model.addAttribute("streaks", user.getStreaks());
        return "sudokuPuzzle";
    }


}
