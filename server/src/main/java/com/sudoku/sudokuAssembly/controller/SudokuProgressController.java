package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.dto.SudokuProgressRequest;
import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import com.sudoku.sudokuAssembly.service.SudokuProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/progress")
public class SudokuProgressController {

    @Autowired
    private SudokuProgressService sudokuProgressService;

    @GetMapping("/allprogress")
    public List<SudokuProgress> findAllProgress(){
        return sudokuProgressService.findAllProgress();
    }

    @PostMapping("/addprogress")
    public SudokuProgress addProgress(@RequestBody SudokuProgressRequest sudokuProgressRequest){

        SudokuProgress progressSearch = sudokuProgressService.getProgressByUsernameAndSudokuId(sudokuProgressRequest.getUsername(), sudokuProgressRequest.getSudokuId());
        if (progressSearch == null)
            return  sudokuProgressService.addSudokuProgress(new SudokuProgress(sudokuProgressRequest.getSudokuId(), sudokuProgressRequest.getUsername(), sudokuProgressRequest.getTimeSpent(), sudokuProgressRequest.isSolved(), sudokuProgressRequest.getIncorrects()));

        return sudokuProgressService.updateSudokuProgress(new SudokuProgress(sudokuProgressRequest.getSudokuId(), sudokuProgressRequest.getUsername(), sudokuProgressRequest.getTimeSpent(), sudokuProgressRequest.isSolved(), sudokuProgressRequest.getIncorrects()));
    }

    @GetMapping("/getprogress/{username}/{sudokuId}")
    public ResponseEntity<?> getSudokuProgressByUsername(@PathVariable String username, @PathVariable UUID sudokuId){

        SudokuProgress sudokuProgress =  sudokuProgressService.getProgressByUsernameAndSudokuId(username, sudokuId);

        if (sudokuProgress == null){
            SudokuProgress newProgress =  sudokuProgressService.addSudokuProgress(new SudokuProgress(sudokuId, username, 0, false, 0));
            return ResponseEntity.ok(newProgress);
        }

        return ResponseEntity.ok(sudokuProgress);
    }


}
