package com.sudoku.sudokuAssembly.repository;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SudokuRepository extends JpaRepository<Sudoku, UUID> {


    @Query(value = "select puzzle from sudokus where date = '2022-09-22' and level = 'easy'", nativeQuery = true)
    String getPuzzleFromDateAndLevel();

    @Query(value = "select solution from sudokus where date= '2022-09-22' and level = 'easy'", nativeQuery = true)
    String getSolutionFromDateAndLevel();

    @Query(value = "select * from sudokus where id =:testing_date" , nativeQuery = true)
    Collection<Sudoku> getA(@Param("testing_date") UUID testing_date);

    @Query(value = "select * from sudokus where date =:date and level =:level", nativeQuery = true)
    Sudoku findByDateAndLevel(@Param("date")String date,@Param("level") String level);

//    @Query(value = "select * from a_sudoku where date = '2022-09-22'", nativeQuery = true)
//    List<Sudoku> findById(UUID id);

    @Query(value = "select * from sudokus where id =:id", nativeQuery = true)
    Sudoku findByIdOfSudoku(@Param("id") UUID id);

    @Query(value = "select * from sudokus where date =:date and level =:level", nativeQuery = true)
    List<Sudoku> allFoundSudokus(@Param("date")String date,@Param("level") String level);
}

