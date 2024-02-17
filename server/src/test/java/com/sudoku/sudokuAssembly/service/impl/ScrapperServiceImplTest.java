package com.sudoku.sudokuAssembly.service.impl;

import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.repository.SudokuRepository;
import com.sudoku.sudokuAssembly.service.ScrapperService;
import com.sudoku.sudokuAssembly.service.impl.ScrapperServiceImpl;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.io.IOException;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class ScrapperServiceImplTest {

    @Mock
    private SudokuRepository sudokuRepository;

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @InjectMocks
    private ScrapperServiceImpl scrapperService;

    @Test
    void newYorkTimes() throws IOException {
        // Mocking Jsoup
        Document document = Jsoup.parse("<script type=\"text/javascript\">your_mocked_script_content</script>");
        when(Jsoup.connect(anyString()).get()).thenReturn(document);

        // Mocking SudokuRepository
        when(sudokuRepository.allFoundSudokus(anyString(), anyString())).thenReturn(Collections.emptyList());
        doNothing().when(sudokuRepository).save(any(Sudoku.class));

        // Mocking RedisTemplate
        doNothing().when(redisTemplate.opsForValue()).set(anyString(), any());

        // Testing the method
        assertDoesNotThrow(() -> scrapperService.newYorkTimes());

        // Verify that the repository methods and RedisTemplate methods are called
        verify(sudokuRepository, times(3)).save(any(Sudoku.class));
        verify(redisTemplate.opsForValue(), times(1)).set(anyString(), any());
    }

    // Add more tests for other methods in ScrapperServiceImpl if needed
}
