package com.sudoku.sudokuAssembly.controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.service.SudokuProgressService;
import com.sudoku.sudokuAssembly.service.SudokuService;
import com.sudoku.sudokuAssembly.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/sudoku")
public class SudokuController {
    private SudokuProgressService sudokuProgressService;
    private final SudokuService sudokuService;
    private final UserService userService;


    private SudokuController(SudokuProgressService sudokuProgressService, SudokuService sudokuService, UserService userService) {
        this.sudokuProgressService = sudokuProgressService;
        this.sudokuService = sudokuService;
        this.userService = userService;
    }

    @ResponseBody
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> findAllSudoku() {
        List<Map<String, Object>> payload = new ArrayList<>();

        for(Sudoku map: sudokuService.findAllSudoku()) {
            HashMap<String, Object> newMap = new HashMap<>();
            newMap.put("id", map.getId());
            newMap.put("date_and_source", map.getDate_and_source());

            newMap.put("puzzle", convertToListOfList(map.getPuzzle()));
            newMap.put("level", map.getLevel());
            newMap.put("solution", convertToListOfList(map.getSolution()));
            newMap.put("source", map.getSource());
            newMap.put("date", map.getDate());

            payload.add(newMap);

        }

        return ResponseEntity.ok(payload);
    }

    @ResponseBody
    @GetMapping("/testsearch")
    public ResponseEntity<List<Map<String, Object>>> get(){

        List<Map<String, Object>> payload = new ArrayList<>();

        for(Sudoku map: sudokuService.findAllSudoku()) {
                HashMap<String, Object> newMap = new HashMap<>();
                newMap.put("id", map.getId());
                newMap.put("date_and_source", map.getDate_and_source());
                newMap.put("puzzle", convertToListOfList(map.getPuzzle()));
                newMap.put("level", map.getLevel());
                newMap.put("solution", convertToListOfList(map.getSolution()));
                newMap.put("source", map.getSource());
                newMap.put("date", map.getDate());

            payload.add(newMap);

        }

        return ResponseEntity.ok(payload);
    }

    @GetMapping("/search/{id}")
    public Sudoku getSudokuFromId(@PathVariable UUID id){
        return sudokuService.findById(id);
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
//        user.addSudoku(sudoku);

        return sudokuService.saveSudoku(sudoku);
    }

    @GetMapping("/search/date-and-difficulty/{dateAndDifficulty}")
    public ResponseEntity<?> findSudokuByDataAndDifficulty(@PathVariable String dateAndDifficulty){

        String date = dateAndDifficulty.substring(0, 10);
        String difficulty = dateAndDifficulty.substring(11);

        Sudoku foundResult = sudokuService.findByDateAndLevel(date, difficulty);

        return ResponseEntity.ok(foundResult);
    }

    public List<List<String>> convertToListOfList(List<String> inputList){
        return IntStream.range(0, 9)
                .mapToObj(i -> inputList.subList(i * 9, (i + 1) * 9))
                .collect(Collectors.toList());
    }



}
