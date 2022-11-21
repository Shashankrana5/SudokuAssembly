package com.sudoku.sudokuAssembly.security;

import com.sudoku.sudokuAssembly.service.impl.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http

                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/adminconsole/getall").authenticated()
                .anyRequest().permitAll()
                .and()
                .httpBasic().and().build();
    }

}
