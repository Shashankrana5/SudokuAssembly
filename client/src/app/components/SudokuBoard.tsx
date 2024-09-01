"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../../../styles/sudokuboard.css";
import "../../../styles/pencil.css";
import Timer from "./Timer";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SudokuBoardProps = {
  sudoku: {
    date: string;
    date_and_source: string;
    id: string;
    level: "easy" | "medium" | "hard";
    puzzle: string[][];
    solution: string[][];
    source: string;
  };
  getProgress: (e:any) => Promise<void>;
  updateProgress: (e:any) => Promise<void>;
  solved: boolean;
  setSolved: Dispatch<SetStateAction<boolean>>;
  incorrects: number;
  setIncorrects: Dispatch<SetStateAction<number>>;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
};

export default function SudokuBoard({
  sudoku,
  solved,
  setSolved,
  setIncorrects,
  seconds,
  setSeconds,
}: SudokuBoardProps) {
  const { solution, level, date, id } = sudoku;
  const board = sudoku.puzzle;

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
  const { push } = useRouter();
  const [timerOn, setTimerOn] = useState(true);
  const [correctNess, setCorrectNess] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ""))
  );

  const [togglePencil, setTogglePencil] = useState(false);

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

  const checkForCompletion = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === "0" && correctNess[r][c] !== solution[r][c])
          return false;
      }
    }
    return true;
  };

  async function getRandomUrl(){
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/api/sudoku/random`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const json = await res.json();
    return json.url
  }

  useEffect(() => {
    if (checkForCompletion() === true) {
      setTimerOn(false);
      setSolved(true);
    }
  }, [correctNess]);

  const resetBoard = (e: any) => {
    const tempBoard = [...board];
    setCorrectNess(tempBoard);

    // Loop through the cells and reset the border styles
    const cells = document.querySelectorAll(".sudoku-cell-single");
    cells.forEach((cell, index) => {
      const tempCell = cell as HTMLElement;
      tempCell.style.border = "solid black 0.25vh";

      if (right_border.includes(index)) {
        tempCell.style.borderRight = "solid black .5vh";
      }
      if (left_border.includes(index)) {
        tempCell.style.borderLeft = "solid black .5vh";
      }
      if (top_border.includes(index)) {
        tempCell.style.borderTop = "solid black .5vh";
      }
      if (bottom_border.includes(index)) {
        tempCell.style.borderBottom = "solid black .5vh";
      }
    });
  };

  const showSolution = () => {
    const newCorrectness = correctNess.map((row, r) =>
      row.map((cell, c) => (board[r][c] === "0" ? solution[r][c] : cell))
    );

    setCorrectNess(newCorrectness);
  };

  const handleInputChange = (e: any, r: number, c: number) => {
    const updatedPencilMarks = [...showPencil];
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.charAt(e.target.value.length - 1);
    }
    const currentValue: string = e.target.value;
    let index = r * 9 + c;

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
      let tempCell = document.querySelector<HTMLElement>(
        "#sudoku-cell-" + (r * 9 + c)
      )!;
      if (e.target.value === "" || e.target.value === solution[r][c]) {
        tempCell.style.border = "solid black 0.25vh";

        if (right_border.includes(index)) {
          tempCell.style.borderRight = "solid black .5vh";
        }
        if (left_border.includes(index)) {
          tempCell.style.borderLeft = "solid black .5vh";
        }
        if (top_border.includes(index)) {
          tempCell.style.borderTop = "solid black .5vh";
        }
        if (bottom_border.includes(index)) {
          tempCell.style.borderBottom = "solid black .5vh";
        }
      } else {
        tempCell.style.border = "solid red 0.40vh";
        if (right_border.includes(index)) {
          tempCell.style.borderRight = "solid red .6vh";
        }
        if (left_border.includes(index)) {
          tempCell.style.borderLeft = "solid red .6vh";
        }
        if (top_border.includes(index)) {
          tempCell.style.borderTop = "solid red .6vh";
        }
        if (bottom_border.includes(index)) {
          tempCell.style.borderBottom = "solid red .6vh";
        }
        setIncorrects(prevIncorrects => prevIncorrects + 1);
      }

      setCorrectNess((prevCorrectness) => {
        const temp = [...prevCorrectness];
        temp[r] = [...temp[r]];
        temp[r][c] = currentValue;
        return temp;
      });
    }
  };

  return (
    <div className="sudoku-board">
      <div className="board-navigation-bar p-4">
        <div className="navigation-division-upper">{`${
          level.charAt(0).toUpperCase() + level.slice(1)
        } ${date}`}</div>
        <div className="navigation-division-lower">
          <Timer state={timerOn} seconds={seconds} setSeconds={setSeconds} />

          <div id="button-div">
            <button
              id="solve-button"
              className="button-4"
              onClick={showSolution}
            >
              Show solution
            </button>
            <button id="clear-button" className="button-4" onClick={resetBoard}>
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
                          value={
                            correctNess[rowIndex][colIndex] === "0"
                              ? ""
                              : correctNess[rowIndex][colIndex]
                          }
                          onChange={(e) =>
                            handleInputChange(e, rowIndex, colIndex)
                          }
                          onBlur={() => setSelectedCell([-1, -1])}
                        />
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={`${solved === false ? "hidden": "absolute flex items-center justify-center z-10 h-2/3 w-2/3"}`}>

          {/* <div className=""> */}
            <div className="completion-child">
              <div className="confetti-seperator">
                <div className="congratulations-text-container">
                  <h3 className="congratulations-text">Congratulations!</h3>
                </div>
                <div className="completion-button-container">
                  <Link
                    id="redirect-home-completed"
                    className="completed-redirect-button"
                    href="/"
                  >
                    Home
                  </Link>
                  <button
                    onClick={async() => push(await getRandomUrl())}
                    id="redirect-random-completed"
                    className="completed-redirect-button"
                  >
                    Random
                  </button>
                  <button
                    onClick={() => {
                      setSolved(false)
                      setTimerOn(true)
                    }}
                    id="redirect-random-completed"
                    className="completed-redirect-button"
                  >
                    Close
                  </button>
                </div>
              {/* </div> */}
              <canvas className="confetti" id="canvas"></canvas>
            </div>
          </div>
          </div>

      </div>
    </div>
  );
}
