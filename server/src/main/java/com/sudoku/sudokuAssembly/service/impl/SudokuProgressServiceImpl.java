package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import com.sudoku.sudokuAssembly.repository.SudokuProgressRepository;
import com.sudoku.sudokuAssembly.service.SudokuProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class SudokuProgressServiceImpl implements SudokuProgressService {

    @Autowired
    private SudokuProgressRepository sudokuProgressRepository;

    public SudokuProgress addSudokuProgress(SudokuProgress sudokuProgress){
        return sudokuProgressRepository.save(sudokuProgress);
    }
    public SudokuProgress getProgressOfSudokuAndUser(UUID userId, UUID sudokuId){
        try{
            return sudokuProgressRepository.getProgressOfSudokuAndUser(userId, sudokuId);
        }catch(Exception e){
            System.out.println("an error has occurred");
            new Exception("The relation isn't found");
            return new SudokuProgress();
        }

    }
    public List<SudokuProgress> findAllProgress(){
        return sudokuProgressRepository.findAll();
    }


    public SudokuProgress getProgressByUsernameAndSudokuId(String username, UUID sudokuId) {
        return sudokuProgressRepository.getSudokuProgressesByUsernameAndSudokuId(username, sudokuId);
    }

    public SudokuProgress updateSudokuProgress(SudokuProgress sudokuProgress){
        SudokuProgress toUpdate = sudokuProgressRepository.getSudokuProgressesByUsernameAndSudokuId(sudokuProgress.getUsername(), sudokuProgress.getSudokuId());

        if (toUpdate != null){
            toUpdate.setTimeSpent(sudokuProgress.getTimeSpent());
            toUpdate.setSolved(sudokuProgress.isSolved());
            toUpdate.setIncorrects(sudokuProgress.getIncorrects());

            return sudokuProgressRepository.save(toUpdate);
        }

        return sudokuProgressRepository.save(sudokuProgress);
    }

}
