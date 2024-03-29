package com.sudoku.sudokuAssembly.repository;


import com.sudoku.sudokuAssembly.entity.ERole;
import com.sudoku.sudokuAssembly.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);

}
