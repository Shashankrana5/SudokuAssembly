package com.sudoku.sudokuAssembly.service.impl;
import com.sudoku.sudokuAssembly.entity.ERole;
import com.sudoku.sudokuAssembly.entity.Sudoku;
import com.sudoku.sudokuAssembly.entity.User;
import com.sudoku.sudokuAssembly.repository.SudokuRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
@ExtendWith(MockitoExtension.class)

class SudokuServiceImplTest {
    @Mock private SudokuRepository sudokuRepository;
    private SudokuServiceImpl underTest;

    @BeforeEach
    void setUp() {
        underTest = new SudokuServiceImpl(sudokuRepository);
    }

    @Test
    void canGetAllStudents() {
        // when
        underTest.findAllSudoku();
        // then
        verify(sudokuRepository).findAll();
    }

    @Test
    void canAddStudent() {
        // given
        Sudoku sudoku = new Sudoku(
                "date-and-source",
                "puzzle",
                "level",
                "solution",
                "source",
                "date",
                new Set<User>() {
                    @Override
                    public int size() {
                        return 0;
                    }

                    @Override
                    public boolean isEmpty() {
                        return false;
                    }

                    @Override
                    public boolean contains(Object o) {
                        return false;
                    }

                    @Override
                    public Iterator<User> iterator() {
                        return null;
                    }

                    @Override
                    public Object[] toArray() {
                        return new Object[0];
                    }

                    @Override
                    public <T> T[] toArray(T[] a) {
                        return null;
                    }

                    @Override
                    public boolean add(User user) {
                        return false;
                    }

                    @Override
                    public boolean remove(Object o) {
                        return false;
                    }

                    @Override
                    public boolean containsAll(Collection<?> c) {
                        return false;
                    }

                    @Override
                    public boolean addAll(Collection<? extends User> c) {
                        return false;
                    }

                    @Override
                    public boolean retainAll(Collection<?> c) {
                        return false;
                    }

                    @Override
                    public boolean removeAll(Collection<?> c) {
                        return false;
                    }

                    @Override
                    public void clear() {

                    }
                },
                new List<User>() {
                    @Override
                    public int size() {
                        return 0;
                    }

                    @Override
                    public boolean isEmpty() {
                        return false;
                    }

                    @Override
                    public boolean contains(Object o) {
                        return false;
                    }

                    @Override
                    public Iterator<User> iterator() {
                        return null;
                    }

                    @Override
                    public Object[] toArray() {
                        return new Object[0];
                    }

                    @Override
                    public <T> T[] toArray(T[] a) {
                        return null;
                    }

                    @Override
                    public boolean add(User user) {
                        return false;
                    }

                    @Override
                    public boolean remove(Object o) {
                        return false;
                    }

                    @Override
                    public boolean containsAll(Collection<?> c) {
                        return false;
                    }

                    @Override
                    public boolean addAll(Collection<? extends User> c) {
                        return false;
                    }

                    @Override
                    public boolean addAll(int index, Collection<? extends User> c) {
                        return false;
                    }

                    @Override
                    public boolean removeAll(Collection<?> c) {
                        return false;
                    }

                    @Override
                    public boolean retainAll(Collection<?> c) {
                        return false;
                    }

                    @Override
                    public void clear() {

                    }

                    @Override
                    public User get(int index) {
                        return null;
                    }

                    @Override
                    public User set(int index, User element) {
                        return null;
                    }

                    @Override
                    public void add(int index, User element) {

                    }

                    @Override
                    public User remove(int index) {
                        return null;
                    }

                    @Override
                    public int indexOf(Object o) {
                        return 0;
                    }

                    @Override
                    public int lastIndexOf(Object o) {
                        return 0;
                    }

                    @Override
                    public ListIterator<User> listIterator() {
                        return null;
                    }

                    @Override
                    public ListIterator<User> listIterator(int index) {
                        return null;
                    }

                    @Override
                    public List<User> subList(int fromIndex, int toIndex) {
                        return null;
                    }
                }
        );

        // when
        underTest.saveSudoku(sudoku);

        // then
        ArgumentCaptor<Sudoku> studentArgumentCaptor =
                ArgumentCaptor.forClass(Sudoku.class);

        verify(sudokuRepository)
                .save(studentArgumentCaptor.capture());

        Sudoku capturedSudoku = studentArgumentCaptor.getValue();

        assertThat(capturedSudoku).isEqualTo(sudoku);
    }

    @Test
    void canDeleteSudoku() {
        // given
        UUID id = UUID.randomUUID();
        given(sudokuRepository.existsById(id))
                .willReturn(true);
        // when
        underTest.deleteSudoku(sudokuRepository.findByIdOfSudoku(id));

        // then
        verify(sudokuRepository).deleteById(id);
    }
}