package com.sudoku.sudokuAssembly.repository;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SudokuRepository extends JpaRepository<Sudoku, String> {

}
