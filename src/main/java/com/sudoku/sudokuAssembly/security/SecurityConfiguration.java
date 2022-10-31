package com.sudoku.sudokuAssembly.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http

                .csrf().disable()
                .authorizeRequests()
//                .antMatchers("/**").authenticated()
//                .antMatchers("/home").permitAll()
                .antMatchers("/adduser").permitAll()
                .antMatchers("/adminconsole").hasAuthority("ADMIN")
                .antMatchers("/adminconsole/**").permitAll()
//                permitAll()

                .antMatchers("/home").authenticated()

                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login").permitAll()
                .defaultSuccessUrl("http://localhost:8080/home")
//                .permitAll()
//                .and()
//                .formLogin(form -> form.default
//                        .defaultSuccessUrl("/home").formLogin().loginPage("/loggingin")failureUrl("/login?error=true")
////                .and()
                .and()
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/loggs")).logoutSuccessUrl("/home")




//                logoutRequestMatcher(new AntPathRequestMatcher("/loggingout")).logoutSuccessUrl("/further")
//                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/loggingout")).logoutSuccessUrl("/further").deleteCookies("JSESSIONID").invalidateHttpSession(true)


                .and()

                .httpBasic()
                .and().build();
    }

    @Autowired
    UserDetailsService userDetailsService;

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }
}
