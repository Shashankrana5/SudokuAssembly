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
            newMap.put("puzzle", convertToList(map.getPuzzle()));
            newMap.put("solution", convertToList(map.getSolution()));
            newMap.put("level", map.getLevel());
            newMap.put("source", map.getSource());
            newMap.put("date", map.getDate());

            payload.add(newMap);

        }

        return ResponseEntity.ok(payload);
    }

    @ResponseBody
    @GetMapping("/search-mobile")
    public ResponseEntity<Map<String, Map<String, Object>>> findAllSudokusMobile() {
        Map<String, Map<String, Object>> payload = new HashMap<>();

        for(Sudoku map: sudokuService.findAllSudoku()){
            HashMap<String, Object> newMap = new HashMap<>();

            newMap.put("id", map.getId());
            newMap.put("date_and_source", map.getDate_and_source());
            newMap.put("puzzle", convertToList(map.getPuzzle()));
            newMap.put("solution", convertToList(map.getSolution()));
            newMap.put("level", map.getLevel());
            newMap.put("source", map.getSource());
            newMap.put("date", map.getDate());
            payload.put(map.getDate()+"-"+map.getLevel(), newMap);
        }
        return ResponseEntity.ok(payload);

    }

    @GetMapping("/search/{id}")
    public Sudoku getSudokuFromId(@PathVariable UUID id){
        return sudokuService.findById(id);
    }


    @GetMapping("/random")
    @ResponseBody
    public ResponseEntity<Map<String, String>> getRandom(){
        Map<String, String> response = new HashMap<>();

        Random randomGenerator = new Random();
        ArrayList<Sudoku> allSudokus = sudokuService.findAllSudoku();
        int index = randomGenerator.nextInt(allSudokus.size());
        Sudoku chosenSudoku = allSudokus.get(index);

        response.put("url", "/sudoku/" + chosenSudoku.getDate() + "-" + chosenSudoku.getLevel());
        
        return ResponseEntity.ok(response);
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

        Sudoku map = sudokuService.findByDateAndLevel(date, difficulty);

        HashMap<String, Object> responseMap = new HashMap<>();
        responseMap.put("id", map.getId());
        responseMap.put("date_and_source", map.getDate_and_source());
        responseMap.put("puzzle", convertToList(map.getPuzzle()));
        responseMap.put("solution", convertToList(map.getSolution()));
        responseMap.put("level", map.getLevel());
        responseMap.put("source", map.getSource());
        responseMap.put("date", map.getDate());

        return ResponseEntity.ok(responseMap);
    }

    public List<List<String>> convertToList(String input) {
        List<List<String>> grid = new ArrayList<>();
        String[] values = input.split(",");

        for (int i = 0; i < 9; i++) {
            List<String> row = new ArrayList<>();
            for (int j = 0; j < 9; j++) {
                int index = i * 9 + j;
                row.add(values[index]);
            }
            grid.add(row);
        }
        return grid;
    }



}
