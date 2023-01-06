package com.sudoku.sudokuAssembly.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Arrays;
import java.util.Collection;


public class CustomUserDetails implements UserDetails {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private boolean active;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;


    public CustomUserDetails(User user){
        this.firstName = user.getFirstName();
        this.username = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.active = user.isActive();
        this.password = user.getPassword();
        this.role = user.getRole();

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(
                new SimpleGrantedAuthority(role.name())
        );
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
