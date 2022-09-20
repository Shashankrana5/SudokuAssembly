package com.sudoku.sudokuAssembly.repository;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SudokuRepository extends JpaRepository<Sudoku, UUID> {

    @Query(value = "select puzzle from a_sudoku where id='058145cd-711a-4f63-8a98-20c18f8351df'",
            nativeQuery = true)
    String getTheId();

//    String getSolutionById()

}
