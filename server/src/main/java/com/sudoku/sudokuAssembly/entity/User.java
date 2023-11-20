package com.sudoku.sudokuAssembly.entity;
//
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import javax.persistence.*;
//import java.time.LocalDate;
//import java.util.*;
//
//@Entity
//@Table(name = "users")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "id")
//    private UUID id;
//
//    @Column(name ="username", nullable = false, unique = true)
//    private String username;
//
//    @Column(name = "first_name", nullable = false)
//    private String firstName;
//
//    @Column(name = "last_name", nullable = false)
//    private String lastName;
//
//    @Column(name = "email", nullable = false, unique = true)
//    private String email;
//
//    @Column(name = "active")
//    private boolean active;
//
//    @Column(name = "password", nullable = false)
//    private String password;
//
//    @Column(name = "streaks")
//    private int streaks;
//
//    public int getStreaks() {
//        return streaks;
//    }
//
//    public void setStreaks(int streaks) {
//        this.streaks = streaks;
//    }
//
//    @Column(name = "role", nullable = false)
//    @Enumerated(EnumType.STRING)
//    private Role role;
//
//
//
//    @Column(name = "loggedIn")
//    @ElementCollection
//    private Set<LocalDate> loggedIn;
//
//    //One thing to note is that when a json is returned when calling a get user call, it will not show
//    //the Set because of the JsonIgnore.
//    @JsonIgnore
//    @ManyToMany(mappedBy = "completed_users")
//    public Set<Sudoku> completed_sudokus = new HashSet<>();
//
//    @JsonIgnore
//    @ManyToMany()
//    @JoinTable(
//            name = "sudokus_attempted",
//            joinColumns = @JoinColumn(name = "userId"),
//            inverseJoinColumns =  @JoinColumn(name = "sudokuId")
//    )
//    public List<Sudoku> attempted_sudokus = new ArrayList<>();
//
//    public User() {
//    }
//
//    public User(UUID id, String firstName, String lastName, String email, String password, Role role, boolean active) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.password = password;
//        this.role = role;
//        this.active = true;
//    }
//
//    public User(String firstName, String lastName, String email, String password, Role role, boolean active) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.password = password;
//        this.role = role;
//        this.active = true;
//        this.completed_sudokus = new HashSet<>();
////        this.loggedIn = new HashSet<>();
//        this.streaks = 0;
//    }
//    public User(String firstName, String lastName, String email, String password, Role role, boolean active, Set<Sudoku> completed_sudokus) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.password = password;
//        this.role = role;
//        this.active = true;
//        this.completed_sudokus = completed_sudokus;
//    }
//
//    public UUID getId() {
//        return id;
//    }
//
//    public void setId(UUID id) {
//        this.id = id;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public Role getRole() {
//        return role;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public boolean isActive() {
//        return active;
//    }
//
//    public void setActive(boolean active) {
//        this.active = active;
//    }
//
//    public void setRole(Role role) {
//        this.role = role;
//    }
//
//    public void addSudoku(Sudoku sudoku){
//        this.completed_sudokus.add(sudoku);
//    }
//    public Set<Sudoku> getCompleted_sudokus() {
//        return completed_sudokus;
//    }
//
//    public Set<LocalDate> getLoggedIn() {
//        return loggedIn;
//    }
//
//    public void setLoggedIn(Set<LocalDate> loggedIn) {
//        this.loggedIn = loggedIn;
//    }
//    public User retrieveAndUpdateStreak(LocalDate today){
//
//        this.streaks = 1;
//        this.loggedIn.add(today);
//        while(this.loggedIn.contains(today.minusDays(1))){
//            this.streaks++;
//            today = today.minusDays(1);
//        }
//
//        this.setStreaks(streaks);
//        return this;
//
//    }
//
//    public List<Sudoku> getAttempted_sudokus() {
//        return attempted_sudokus;
//    }
//
//    public void setAttempted_sudokus(List<Sudoku> attempted_sudokus) {
//        this.attempted_sudokus = attempted_sudokus;
//    }
//
//    public void addAttempt(Sudoku sudoku){
//        if (!this.getAttempted_sudokus().contains(sudoku)){
//            this.getAttempted_sudokus().add(sudoku);
//        }
//    }
//
//    public User(String username, String firstName, String lastName, String email, boolean active, String password, int streaks, Role role, Set<LocalDate> loggedIn, Set<Sudoku> completed_sudokus, List<Sudoku> attempted_sudokus) {
//        this.username = username;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.active = active;
//        this.password = password;
//        this.streaks = streaks;
//        this.role = role;
//        this.loggedIn = loggedIn;
//        this.completed_sudokus = completed_sudokus;
//        this.attempted_sudokus = attempted_sudokus;
//    }
//
//    public String toString(){
//        return "" + this.getUsername() + " "  + this.getFirstName() + " " + this.getLastName() + " " + this.getEmail() + " " + this.getPassword();
//    }
//
//}
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name ="username", nullable = false, unique = true)
    private String username;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "streaks")
    private int streaks;

    //One thing to note is that when a json is returned when calling a get user call, it will not show
    //the Set because of the JsonIgnore.
    @JsonIgnore
    @ManyToMany(mappedBy = "completed_users")
    public Set<Sudoku> completed_sudokus = new HashSet<>();

    @JsonIgnore
    @ManyToMany()
    @JoinTable(
            name = "sudokus_attempted",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns =  @JoinColumn(name = "sudokuId")
    )
    public List<Sudoku> attempted_sudokus = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_to_roles",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles = new HashSet<>();

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}