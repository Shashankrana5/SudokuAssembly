import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";

type CheckBorderFunctionType = (
  borderSet: Set<number>,
  borderIndex: number
) => boolean;
type HandleCellSelectType = (row: number, col: number) => void;

interface SudokuBoardInputCellProps {
  rowIndex: number;
  colIndex: number;
  colData: string;
  isSelected: boolean;
  right_border: Set<number>;
  left_border: Set<number>;
  top_border: Set<number>;
  bottom_border: Set<number>;
  checkBorder: CheckBorderFunctionType;
  handleCellSelect: HandleCellSelectType;
  pencilData: number[];
  incorrects: number[][]; 
}

const SudokuBoardInputCell = React.memo(
  ({
    rowIndex,
    colIndex,
    colData,
    isSelected,
    handleCellSelect,
    pencilData,
    right_border,
    left_border,
    top_border,
    bottom_border,
    checkBorder,
    incorrects
  }: SudokuBoardInputCellProps) => {
    const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });
    useEffect(() => {
      setSelectedCell({ row: -1, col: -1 });
    }, [colData]);

    const checkCorrectness = (): boolean => {

      return incorrects[rowIndex][colIndex] === 0;
    }

    return (
      <TouchableOpacity
        style={[

          checkCorrectness() && styles.cell,
          !checkCorrectness() && styles.incorrect,
          styles.parent,
          isSelected && styles.selectedCell,
          checkBorder(right_border, 9 * rowIndex + colIndex) &&
            styles.rightBorder,
          checkBorder(left_border, 9 * rowIndex + colIndex) &&
            styles.leftBorder,
          checkBorder(top_border, 9 * rowIndex + colIndex) && styles.topBorder,
          checkBorder(bottom_border, 9 * rowIndex + colIndex) &&
            styles.bottomBorder,
        ]}
        onPress={() => handleCellSelect(rowIndex, colIndex)}
      >
        <View style={[styles.child1]}>
          <Text>{colData === "0" ? "" : colData}</Text>
        </View>
        <View style={[styles.child2, styles.parentContainer]}>
          {pencilData &&
            pencilData.map((key, index) => (
              <View key={index} style={styles.childContainer}>
                {key === 0 ? (
                  <Text style={{ display: "none" }}>{index + 1}</Text>
                ) : (
                  <Text>{index + 1}</Text>
                )}
              </View>
            ))}
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({

  cell: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: 42,
    height: 42,
    margin: 0.01, // Adjust this margin to create space between cells
  },
  incorrect: {
    width: 42,
    height: 42,
    backgroundColor: 'white',
    borderColor: "red",
    borderWidth: 2,
    shadowOpacity: 0.5,
    shadowColor: "red",
    shadowRadius: 4,
  },

  parent: { position: "relative", backgroundColor: "white" },
  selectedCell: { backgroundColor: "lightblue" },
  rightBorder: { borderRightWidth: 2 },
  leftBorder: { borderLeftWidth: 2 },
  topBorder: { borderTopWidth: 2 },
  bottomBorder: { borderBottomWidth: 2 },
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
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    // backgroundColor: "white",
    opacity: 0.5,
    zIndex: 0,
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
});

export default SudokuBoardInputCell;
