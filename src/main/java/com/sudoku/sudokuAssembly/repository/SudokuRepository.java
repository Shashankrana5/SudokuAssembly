package com.sudoku.sudokuAssembly.repository;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SudokuRepository extends JpaRepository<Sudoku, UUID> {

    @Query(value = "select puzzle from a_sudoku where id='5a3cc0ee-3f24-4c32-814a-2993c5b3a46f'",
            nativeQuery = true)
    public String getTheId();
}
