package com.sudoku.sudokuAssembly.controller;

import com.sudoku.sudokuAssembly.entity.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

//class SudokuControllerTest {
//
//    @Test
//    void findAllSudoku() {
//    }
//
//    @Test
//    void findAllSudokusMobile() {
//    }
//
//    @Test
//    void getSudokuFromId() {
//    }
//
//    @Test
//    void getRandom() {
//    }
//
//    @Test
//    void saveSudoku() {
//    }
//
//    @Test
//    void updateSudoku() {
//    }
//
//    @Test
//    void deleteSudoku() {
//    }
//
//    @Test
//    void addCompletion() {
//    }
//
//    @Test
//    void findSudokuByDataAndDifficulty() {
//    }
//
//    @Test
//    void convertToList() {
//    }
//}

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sudoku.sudokuAssembly.controller.SudokuController;
import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.service.SudokuService;
import com.sudoku.sudokuAssembly.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.*;

import static org.mockito.Mockito.*;

@WebMvcTest(SudokuController.class)
class SudokuControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private SudokuController sudokuController;

    @Mock
    private SudokuService sudokuService;

    @Mock
    private UserService userService;

    @Test
    void findAllSudoku() throws Exception {
        when(sudokuService.findAllSudoku()).thenReturn((ArrayList<Sudoku>) Collections.singletonList(createMockSudoku()));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/sudoku/search"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1));
    }

    @Test
    void findAllSudokusMobile() throws Exception {
        when(sudokuService.findAllSudoku()).thenReturn((ArrayList<Sudoku>) Collections.singletonList(createMockSudoku()));


        mockMvc.perform(MockMvcRequestBuilders.get("/api/sudoku/search-mobile"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1));
    }

    @Test
    void getSudokuFromId() throws Exception {
        UUID sudokuId = UUID.randomUUID();
        when(sudokuService.findById(sudokuId)).thenReturn(createMockSudoku());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/sudoku/search/" + sudokuId))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void saveSudoku() throws Exception {
        Sudoku sudoku = createMockSudoku();
        when(sudokuService.saveSudoku(any(Sudoku.class))).thenReturn(sudoku);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/sudoku/createsudoku")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(sudoku)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void updateSudoku() throws Exception {
        Sudoku sudoku = createMockSudoku();
        when(sudokuService.updateSudoku(any(Sudoku.class))).thenReturn(sudoku);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/sudoku/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(sudoku)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void deleteSudoku() throws Exception {
        UUID sudokuId = UUID.randomUUID();
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/sudoku/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(sudokuId)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(sudokuService, times(1)).deleteSudokuById(sudokuId);
    }

    @Test
    void addCompletion() throws Exception {
        UUID sudokuId = UUID.randomUUID();
        User user = createUser();
        when(sudokuService.findById(sudokuId)).thenReturn(createMockSudoku());
        when(userService.findByEmail(anyString())).thenReturn(user);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("sudoku_id", sudokuId.toString());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/sudoku/addcompletion")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestBody)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(sudokuService, times(1)).saveSudoku(any(Sudoku.class));
    }

    @Test
    void findSudokuByDataAndDifficulty() throws Exception {
        String dateAndDifficulty = "2024-02-16-easy";

        when(sudokuService.findByDateAndLevel("2024-02-16", "easy")).thenReturn(createMockSudoku());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/sudoku/search/date-and-difficulty/" + dateAndDifficulty))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    private Sudoku createMockSudoku() {
        Sudoku sudoku = new Sudoku();
        // Set necessary properties for the mock sudoku
        return sudoku;
    }

    private User createUser() {
        User user = new User();
        // Set necessary properties for the mock user
        return user;
    }
}
