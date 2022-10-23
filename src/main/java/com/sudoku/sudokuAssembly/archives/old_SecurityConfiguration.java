//package com.sudoku.sudokuAssembly.archives;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.NoOpPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//
////    @Bean
//
////    public InMemoryUserDetailsManager userDetailsManager(){
////
////        UserDetails user = User.withDefaultPasswordEncoder()
////                .username("user").password("password").roles("USER").build();
////
////        UserDetails admin = User.withDefaultPasswordEncoder()
////                .username("admin").password("password").roles("ADMIN").build();
////
////        return new InMemoryUserDetailsManager(user,admin);
////    }
////
////    @Bean
////    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
////        return http
////                .csrf().disable()
////                .authorizeRequests()
////                .antMatchers("/").permitAll()
//////                .antMatchers("/userinfo").hasRole("USER")
//////                .antMatchers("/adminconsole").hasRole("ADMIN")
////                .anyRequest().authenticated()
////                .and()
////                .httpBasic()
////                .and().build();
////    }
////
////    @Autowired
////    UserDetailsService userDetailService;
////
////    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
////        auth.userDetailsService(userDetailService);
////    }
////
////    @Bean
////    public PasswordEncoder getPasswordEncoder(){
////        return NoOpPasswordEncoder.getInstance();
////    }
//
//
//
//
//
//}
