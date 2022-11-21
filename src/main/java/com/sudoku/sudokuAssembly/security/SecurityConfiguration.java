package com.sudoku.sudokuAssembly.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {

        return http

                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/adduser").permitAll()
                .antMatchers("/registration").permitAll()
                .antMatchers("/adminconsole").hasAuthority("ADMIN")
                .antMatchers("/adminconsole/**").permitAll()
                .antMatchers("/").permitAll()
                .antMatchers("/home").authenticated()

                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login").permitAll()
                .defaultSuccessUrl("http://localhost:8080/home")

                .and().logout().logoutSuccessUrl("/login").deleteCookies("JSESSIONID").invalidateHttpSession(true)

                .and()

                .httpBasic()
                .and().build();
    }


}
