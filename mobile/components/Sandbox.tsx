import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import SudokuBoardInputCell from "./SudokuBoardInputCell";
import SudokuInputButton from "./SudokuInputButton";

export default function Sandbox() {
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });
  const [pencilOn, setPencilOn] = useState(false);

  const right_border = new Set<number>([
    2, 5, 11, 14, 20, 23, 29, 32, 38, 41, 47, 50, 56, 59, 65, 68, 74, 77,
  ]);
  const left_border = new Set<number>([
    3, 6, 12, 15, 21, 24, 30, 33, 39, 42, 48, 51, 57, 60, 66, 69, 75, 78,
  ]);
  const top_border = new Set<number>([
    27, 28, 29, 30, 31, 32, 33, 34, 35, 54, 55, 56, 57, 58, 59, 60, 61, 62,
  ]);
  const bottom_border = new Set<number>([
    18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53,
  ]);

  const isCellSelected = (row: any, col: any) => {
    return row === selectedCell.row || col === selectedCell.col;
  };

  const [pencil, setPencil] = useState<number[][][] | null>(null);

  const initialBoard = [
    ["5", "3", "0", "0", "7", "0", "0", "0", "0"],
    ["6", "0", "0", "1", "9", "5", "0", "0", "0"],
    ["0", "9", "8", "0", "0", "0", "0", "6", "0"],
    ["8", "0", "0", "0", "6", "0", "0", "0", "3"],
    ["4", "0", "0", "8", "0", "3", "0", "0", "1"],
    ["7", "0", "0", "0", "2", "0", "0", "0", "6"],
    ["0", "6", "0", "0", "0", "0", "2", "8", "0"],
    ["0", "0", "0", "4", "1", "9", "0", "0", "5"],
    ["0", "0", "0", "0", "8", "0", "0", "7", "9"],
  ];

  const [untouchable, setUntouchable] = useState<number[][] | null>(null);

  useEffect(() => {
    const array3D = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0))
    );
    const array2D = [];
    for (let arr of initialBoard) {
      let temp = new Array<number>(9);
      for (let i = 0; i < 9; i++) {
        if (arr[i] === "0") temp[i] = 0;
        else temp[i] = 1;
      }
      array2D.push(temp);
    }

    setPencil(array3D);
    setUntouchable(array2D);
  }, []);
  const [board, setBoard] = useState(initialBoard);

  const handleCellSelect = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
  }, []);

  const checkBorder = (borderSet: Set<number>, borderIndex: number) => {
    if (borderSet.has(borderIndex)) {
      return true;
    }
    return false;
  };

  const handlePress = useCallback(
    (number: number) => {
      if (pencilOn && selectedCell.row !== -1 && selectedCell.col !== -1) {
        setPencil((prevPencil) => {
          const updatedPencil = [...prevPencil!];
          updatedPencil[selectedCell.row][selectedCell.col][number - 1] = 1;
          return updatedPencil;
        });
      } else if (
        !pencilOn &&
        selectedCell.row !== -1 &&
        selectedCell.col !== -1
      ) {
        setBoard((prevBoard) => {
          const updatedBoard = [...prevBoard];
          updatedBoard[selectedCell.row][selectedCell.col] = "" + number;
          return updatedBoard;
        });
      }
    },

    [pencilOn, selectedCell]
  );

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((col, colIndex) => {
            if (untouchable && untouchable[rowIndex][colIndex] === 0)
              return (
                <SudokuBoardInputCell
                  key={`${rowIndex}-${colIndex}`}
                  colData={col}
                  isSelected={
                    selectedCell.row === rowIndex ||
                    selectedCell.col === colIndex
                  }
                  handleCellSelect={() => handleCellSelect(rowIndex, colIndex)}
                  // handlePress={() => handlePress(col)}
                  pencilData={pencil![rowIndex][colIndex]}
                  right_border={right_border}
                  left_border={left_border}
                  top_border={top_border}
                  bottom_border={bottom_border}
                  checkBorder={checkBorder}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                />
              );
            else
              return (
                <View
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.cell,
                    styles.parent,
                    isCellSelected(rowIndex, colIndex) && styles.selectedCell,
                    checkBorder(right_border, 9 * rowIndex + colIndex) &&
                      styles.rightBorder,
                    checkBorder(left_border, 9 * rowIndex + colIndex) &&
                      styles.leftBorder,
                    checkBorder(top_border, 9 * rowIndex + colIndex) &&
                      styles.topBorder,
                    checkBorder(bottom_border, 9 * rowIndex + colIndex) &&
                      styles.bottomBorder,
                  ]}
                >
                  <View style={[styles.child1]}>
                    <Text>{col}</Text>
                  </View>
                </View>
              );
          })}
        </View>
      ))}
      <Button
        title={pencilOn ? "Pencil Turn off" : "Pencil turn on"}
        onPress={() => setPencilOn(!pencilOn)}
      />

      <SudokuInputButton handlePress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 1,
    borderColor: "black",
    width: 42,
    height: 42,
  },
  rightBorder: {
    borderRightWidth: 3,
  },
  leftBorder: { borderLeftWidth: 3 },
  topBorder: { borderTopWidth: 3 },
  bottomBorder: { borderBottomWidth: 3 },

  yellowBackground: {
    backgroundColor: "yellow",
  },
  parentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: 40,
    height: 40,
  },
  childContainer: {
    width: "33%",
    height: "33%",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  normalCell: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    opacity: 0.5,
  },
  selectedCell: {
    backgroundColor: "lightblue",
  },

  parent: {
    position: "relative",
    backgroundColor: "lightgray",
  },
  child1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: 0.5,
    zIndex: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  child2: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  },
});
