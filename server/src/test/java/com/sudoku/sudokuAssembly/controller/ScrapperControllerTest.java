package com.sudoku.sudokuAssembly.controller;

import static org.junit.jupiter.api.Assertions.*;

import com.sudoku.sudokuAssembly.service.ScrapperService;
import com.sudoku.sudokuAssembly.service.SudokuService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ScrapperController.class)
class ScrapperControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private ScrapperController scrapperController;

    @Mock
    private ScrapperService scrapperService;

    @Mock
    private SudokuService sudokuService;

    @Test
    void scrape() throws Exception {
        mockMvc.perform(get("/api/scrape/scrape"))
                .andExpect(status().isOk());

        Mockito.verify(scrapperService, Mockito.times(1)).scrape();
    }
}
