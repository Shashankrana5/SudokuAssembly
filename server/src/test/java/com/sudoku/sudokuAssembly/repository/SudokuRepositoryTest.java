package com.sudoku.sudokuAssembly.repository;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql; // Import this
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.runner.RunWith;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@RunWith (SpringRunner.class)
class SudokuRepositoryTest {

    @Autowired
    private SudokuRepository testInstance;

    @AfterEach
    void tearDown() {
        testInstance.deleteAll();
    }

    @Test
    void itShouldCheckWhenStudentEmailExists() {
        // given
        String date = "2023-01-01";
        String level = "easy";

        boolean result = testInstance.findByDateAndLevel(date, level) instanceof Sudoku;
        assertThat(result).isTrue();
    }
    @Test
    void itShouldCheckWhenTest1() {
        // given
        String date = "2022-07-15";
        String level = "easy";

        boolean result = testInstance.findByDateAndLevel(date, level) instanceof Sudoku;
        assertThat(result).isTrue();
    }

    @Test
    void itShouldCheckWhenTest2() {
        // given
        String date = "2022-10-30";
        String level = "medium";

        boolean result = testInstance.findByDateAndLevel(date, level) instanceof Sudoku;
        assertThat(result).isTrue();
    }

    @Test
    void itShouldCheckWhenTest3() {
        // given
        String date = "2023-03-05";
        String level = "hard";

        boolean result = testInstance.findByDateAndLevel(date, level) instanceof Sudoku;
        assertThat(result).isTrue();
    }

    @Test
    void itShouldCheckWhenTest4() {
        // given
        String date = "2023-08-20";
        String level = "easy";

        boolean result = testInstance.findByDateAndLevel(date, level) instanceof Sudoku;
        assertThat(result).isTrue();
    }

    @Test
    void itShouldCheckWhenTest5() {
        // given
        String date = "2023-11-10";
        String level = "medium";

        boolean result = testInstance.findByDateAndLevel(date, level) instanceof Sudoku;
        assertThat(result).isTrue();
    }

    @Test
    void itShouldCheckWhenTest6() {
        // given
        String date = "2024-01-05";
        String level = "hard";

        boolean result = testInstance.findByDateAndLevel(date, level) instanceof Sudoku;
        assertThat(result).isTrue();
    }

}
