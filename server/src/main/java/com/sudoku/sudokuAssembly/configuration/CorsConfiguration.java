package com.sudoku.sudokuAssembly.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("GET", "PUT", "POST", "DELETE")
                    .allowedOrigins("http://localhost:3000", "https://sudokuassembly.com", "https://www.sudokuassembly.com", "http://www.sudokuassembly.com", "http://sudokuassembly.com");
	    }
        };
    }
}
