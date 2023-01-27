package com.sudoku.sudokuAssembly.security;

import com.sudoku.sudokuAssembly.entity.CustomUserDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@CrossOrigin("http://localhost:3000/**")
public class SecurityConfiguration {

    private CustomUserDetails customUserDetails;
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {

        return http

                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/adduser").permitAll()
                .antMatchers("/registration").permitAll()
//                .antMatchers("/adminconsole").hasAuthority("ADMIN")
//                .antMatchers("/adminconsole/**").permitAll()
//                .antMatchers("/").permitAll()
//                .antMatchers("/home").authenticated()

//                .anyRequest().authenticated()
                .antMatchers("/").authenticated()
                .antMatchers("/home").authenticated()
                .anyRequest().permitAll()
                .and()
                .formLogin().loginPage("/signin").permitAll()
                .loginProcessingUrl("/loginhandle").permitAll()
                .defaultSuccessUrl("http://localhost:8080/home")

                .and().logout().logoutSuccessUrl("/signin").deleteCookies("JSESSIONID").invalidateHttpSession(true)

                .and()

                .httpBasic()
                .and().build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000/loginpage"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean
    AuthenticationManager authenticationManager(){
        AuthenticationManager authenticationManager = new AuthenticationManager() {
            @Override
            public Authentication authenticate(Authentication authentication) throws AuthenticationException {
                return authentication;
            }
        };
        return authenticationManager;
    };
}
