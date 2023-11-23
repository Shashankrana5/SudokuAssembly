"use client";

import { useEffect, useState } from "react";
import "../../../styles/sudokuboard.css";
import "../../../styles/pencil.css";

type SudokuBoardProps = {
  boardData: string[][];
  boardSolution: string[][];
};

export default function SudokuBoard({
  boardData,
  boardSolution,
}: SudokuBoardProps) {
  const right_border = [
    2, 5, 11, 14, 20, 23, 29, 32, 38, 41, 47, 50, 56, 59, 65, 68, 74, 77,
  ];
  const left_border = [
    3, 6, 12, 15, 21, 24, 30, 33, 39, 42, 48, 51, 57, 60, 66, 69, 75, 78,
  ];
  const top_border = [
    27, 28, 29, 30, 31, 32, 33, 34, 35, 54, 55, 56, 57, 58, 59, 60, 61, 62,
  ];
  const bottom_border = [
    18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53,
  ];

  const [board, setBoard] = useState<string[][]>(boardData);
  const [solution, setSolution] = useState<string[][]>(boardSolution);
  const [correctNess, setCorrectNess] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ""))
  );

  const [togglePencil, setTogglePencil] = useState(false);

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState([-1, -1]);
  const [showPencil, setShowPencil] = useState(
    Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0))
    )
  );

  function checkSelection(row: number, col: number): string {
    if (selectedCell[0] !== -1 && selectedCell[1] !== -1) {
      if (selectedCell[0] === row || selectedCell[1] === col)
        return "selected-cell-highlight";
    }
    return "";
  }

  const checkPencilSelection = (
    row: number,
    col: number,
    pencilIndex: number
  ) => {
    if (showPencil[row][col][pencilIndex] === 0) return "pencil-hidden";
    return "";
  };

  const changeBackground = (r: number, c: number) => {
    if (selectedCell[0] === r && selectedCell[1] === c) {
      console.log(correctNess[r][c]);
      console.log(solution[r][c]);
      console.log(board[r][c]);
      console.log(correctNess[r][c] === solution[r][c]);
      console.log(board[r][c] === "0");
    }

    if (
      correctNess[r][c] === "" ||
      correctNess[r][c] === solution[r][c] ||
      board[r][c] !== "0"
    ) {
      return { borderColor: "" };
    }
    return { borderColor: "red" };
  };

  const handleInputChange = (e: any, r: number, c: number) => {
    e.target.value = e.target.value.charAt(e.target.value.length - 1);
    const updatedPencilMarks = [...showPencil];
    const currentValue: string = e.target.value;

    if (togglePencil) {
      if (showPencil[r][c][parseInt(e.target.value) - 1] !== 0) {
        updatedPencilMarks[r][c][parseInt(e.target.value) - 1] = 0;
        setShowPencil(updatedPencilMarks);
      } else {
        updatedPencilMarks[r][c][parseInt(e.target.value) - 1] = 1;
        setShowPencil(updatedPencilMarks);
      }
      e.target.value = currentValue.substring(0, currentValue.length - 1);
    } else {
      if (e.target.value !== solution[r][c]) {
        let temp = correctNess;
        temp[r][c] = "";
        setCorrectNess(temp);
      } else {
        let temp = correctNess;
        temp[r][c] = e.target.value;
        setCorrectNess(temp);
      }
    }
  };

  return (
    <div
      className="sudoku-board"
      // th:fragment="sudoku-board-default"
    >
      <div className="board-navigation-bar">
        <div
          className="navigation-division-upper"
          // th:text = "${date}"
        ></div>
        <div className="navigation-division-lower">
          <div id="counter-clock">00:00</div>
          <div id="button-div">
            <button id="solve-button" className="button-4">
              Show solution
            </button>
            <button id="clear-button" className="button-4">
              Reset
            </button>
            <div className="pencil-switch-container">
              <span className="pencil-text">Toggle Pencil:</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                className="toggle-pencil"
                checked={togglePencil}
                onChange={() => setTogglePencil(!togglePencil)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="board-game">
        <table id="actual-board">
          <tbody>
            <tr>
              {[...Array(9)].map((_, index) => (
                <th key={`row-${index + 1}`} id={`row-${index + 1}`}></th>
              ))}
            </tr>
            {[...Array(9)].map((_, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="sudoku-row">
                {[...Array(9)].map((_, colIndex) => {
                  if (board[rowIndex][colIndex] !== "0") {
                    return (
                      <td
                        key={`sudoku-cell-${rowIndex * 9 + colIndex}`}
                        id={`sudoku-cell-${rowIndex * 9 + colIndex}`}
                        className={`sudoku-cell-single ${checkSelection(
                          rowIndex,
                          colIndex
                        )}`}
                      >
                        {board[rowIndex][colIndex]}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={`sudoku-cell-${rowIndex * 9 + colIndex}`}
                        id={`sudoku-cell-${rowIndex * 9 + colIndex}`}
                        className={`sudoku-cell-single ${checkSelection(
                          rowIndex,
                          colIndex
                        )}`}
                        style={changeBackground(rowIndex, colIndex)}
                      >
                        <div
                          id={`pencil-${rowIndex * 9 + colIndex}`}
                          className="pencil"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                            (val, pencilIndex) => {
                              return (
                                <div
                                  key={pencilIndex}
                                  className={`pencil-indivisual ${checkPencilSelection(
                                    rowIndex,
                                    colIndex,
                                    pencilIndex
                                  )}`}
                                >
                                  {val}
                                </div>
                              );
                            }
                          )}
                        </div>
                        <input
                          type="number"
                          min={1}
                          max={9}
                          className={`cell-${
                            rowIndex * 9 + colIndex
                          } sudoku-input-cell`}
                          style={{ position: "absolute" }}
                          onClick={() => setSelectedCell([rowIndex, colIndex])}
                          onChange={(e) =>
                            handleInputChange(e, rowIndex, colIndex)
                          }
                        />
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
