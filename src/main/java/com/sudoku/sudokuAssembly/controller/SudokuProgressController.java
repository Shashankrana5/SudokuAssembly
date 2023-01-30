package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import com.sudoku.sudokuAssembly.service.SudokuProgressService;
import com.sudoku.sudokuAssembly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class SudokuProgressController {

    @Autowired
    private UserService userService;

    @Autowired
    private SudokuProgressService sudokuProgressService;

    @GetMapping("/allprogress")
    public List<SudokuProgress> findAllProgress(){
        return sudokuProgressService.findAllProgress();
    }
    @ResponseBody
    @PostMapping("/sudoku/addprogress")
    public SudokuProgress addProgress(@RequestBody Map<String, String> data){
        UUID sudokuId = UUID.fromString(data.get("sudoku_id"));
        UUID userId = userService.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).getId();

        SudokuProgress sudokuProgress = sudokuProgressService.getProgressOfSudokuAndUser(userId, sudokuId);
        if (sudokuProgress == null){
                sudokuProgress = new SudokuProgress(sudokuId, userId, Long.parseLong(data.get("timeSpent")), Boolean.parseBoolean(data.get("solved")), Integer.parseInt(data.get("incorrects")));
                sudokuProgressService.addSudokuProgress(sudokuProgress);
        }
        else {
            sudokuProgress.setIncorrects(sudokuProgress.getIncorrects() + Integer.parseInt(data.get("incorrects")));
            sudokuProgress.setTimeSpent(Long.parseLong(data.get("timeSpent")));
            if (!sudokuProgress.isSolved()){
                sudokuProgress.setSolved(Boolean.parseBoolean(data.get("solved")));
            }
            sudokuProgress = sudokuProgressService.updateSudokuProgress(sudokuProgress);
        }
        return sudokuProgress;
    }

    @ResponseBody
    @GetMapping("sudoku/getprogress")
    public SudokuProgress getProgressOfSudokuAndUser(@RequestBody Map<String, UUID> data){

        UUID userId = data.get("userId");
        UUID sudokuId = data.get("sudokuId");
        SudokuProgress sudokuProgress = sudokuProgressService.getProgressOfSudokuAndUser(userId, sudokuId);
        return sudokuProgress;
    }


}
