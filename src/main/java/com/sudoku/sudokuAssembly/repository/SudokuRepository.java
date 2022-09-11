package com.sudoku.sudokuAssembly.repository;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SudokuRepository extends JpaRepository<Sudoku, UUID> {

    @Query(value = "select puzzle from a_sudoku where id='259eb630-2a86-4e95-9071-b4c285c729c0'",
            nativeQuery = true)
    String getTheId();

//    String getSolutionById()

}
