//package com.sudoku.sudokuAssembly.archives;
//
//import com.sudoku.sudokuAssembly.entity.User;
//import com.sudoku.sudokuAssembly.entity.UserRole;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.List;
//
//public class MyUserDetails implements UserDetails {
//
//    private String username;
//
//    private String firstName;
//
//    private String lastName;
//
//    private String email;
//
//    private boolean active;
//
//    private String password;
//
//    private UserRole userRole;
//    private List<GrantedAuthority> autorities;
//
//
//
//    public MyUserDetails(User user){
//        this.username = user.getUsername();
//        this.password = user.getPassword();
//        this.firstName = user.getFirstName();
//        this.lastName = user.getLastName();
//        this.email = user.getEmail();
//        this.active = user.isActive();
//        this.userRole = user.getUserRole();
//    }
//
//
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
////        return Arrays.asList(new SimpleGrantedAuthority("USER"),
////                new SimpleGrantedAuthority("ADMIN"));
//        return autorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return username;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
