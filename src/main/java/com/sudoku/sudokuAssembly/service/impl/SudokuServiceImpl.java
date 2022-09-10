package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.repository.SudokuRepository;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class SudokuServiceImpl implements SudokuService {

    private final SudokuRepository sudokuRepository;

    private SudokuServiceImpl(SudokuRepository sudokuRepository){
        this.sudokuRepository = sudokuRepository;
    }

    @Override
    public ArrayList<Sudoku> findAllSudoku() {
        return (ArrayList<Sudoku>) sudokuRepository.findAll();
    }

    @Override
    public Optional<Sudoku> findById(UUID id) {return sudokuRepository.findById(id);
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

    public String getTheId(){
        return sudokuRepository.getTheId();
    }

}
