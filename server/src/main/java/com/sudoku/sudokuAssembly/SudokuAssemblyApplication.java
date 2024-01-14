package com.sudoku.sudokuAssembly;

import com.sudoku.sudokuAssembly.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class SudokuAssemblyApplication {

	public static void main(String[] args) {
		SpringApplication.run(SudokuAssemblyApplication.class, args);
	}

}
