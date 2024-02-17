package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.SudokuRepository;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SudokuServiceImpl implements SudokuService {

    private final SudokuRepository sudokuRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public SudokuServiceImpl(SudokuRepository sudokuRepository){
        this.sudokuRepository = sudokuRepository;
    }

    @Override
    public ArrayList<Sudoku> findAllSudoku() {

        ArrayList<Sudoku> cachedData = (ArrayList<Sudoku>) redisTemplate.opsForValue().get("sudokus");

        if (cachedData == null) {
            cachedData = (ArrayList<Sudoku>)this.sudokuRepository.findAll();
            System.out.println(cachedData);
            redisTemplate.opsForValue().set("sudokus", cachedData);
        }

        return cachedData;
    }


    @Override
    public Sudoku saveSudoku(Sudoku sudoku) {
        return sudokuRepository.save(sudoku);
    }

    @Override
    public Sudoku updateSudoku(Sudoku sudoku) {
        return sudokuRepository.save(sudoku);
    }

    @Override
    public void deleteSudoku(Sudoku sudoku) {
        sudokuRepository.deleteById(sudoku.getId());
    }

    @Override
    public Sudoku findByDateAndSource() {
        return null;
    }

    @Override
    public String getPuzzleFromDateAndLevel(){
    return sudokuRepository.getPuzzleFromDateAndLevel();
    }

    @Override
    public String getSolutionFromDateAndLevel(){
        return sudokuRepository.getSolutionFromDateAndLevel();
    }
    @Override
    public Collection<Sudoku> getA(String testing_date){
        return sudokuRepository.getA(UUID.fromString(testing_date));
    }
    @Override
    public Sudoku findByDateAndLevel(String date, String level){
        return sudokuRepository.findByDateAndLevel(date, level);
    }
    @Override
    public Sudoku findById(UUID id){
        return sudokuRepository.findByIdOfSudoku(id);
    }

    @Override
    public boolean exists(String date, String level) {
        if (sudokuRepository.allFoundSudokus(date, level).size() > 0) {
            return true;
        }
        return false;
    }

    public Sudoku updateAttempt(Sudoku sudoku){
        return sudokuRepository.save(sudoku);
    }

    @Override
    public void deleteSudokuById(UUID sudokuId) {
        this.sudokuRepository.deleteById(sudokuId);
    }
}
