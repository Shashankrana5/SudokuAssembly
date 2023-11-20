package com.sudoku.sudokuAssembly.repository;


import com.sudoku.sudokuAssembly.entity.SudokuProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository

public interface SudokuProgressRepository extends JpaRepository<SudokuProgress, UUID> {

    @Query(value = "select * from sudoku_tracker where user_id =:userId and sudoku_id =:sudokuId", nativeQuery = true)
    SudokuProgress getProgressOfSudokuAndUser(@Param("userId") UUID userId, @Param("sudokuId") UUID sudokuId);
}
