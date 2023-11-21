//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

export default function Sandbox() {
  const [showRedOnTop, setShowRedOnTop] = useState(true);
  const [selectedCell, setSelectedCell] = useState({row: -1, col: -1});

  const isCellSelected = (row: any, col: any) => {
        return (
          row === selectedCell.row || col === selectedCell.col
        );
      };

  const [pencil, setPencil] = useState(null);

  const handlePress = (number) => {
    console.log(`Button ${number} pressed`);
    // Handle the press logic here for each button
  };

  const handleInputChange = (value, row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = value === "" ? "0" : value;
    setBoard(newBoard);
  };

  useEffect(() => {
    const array3D: number[9][9][9] = [];

    for (let i = 0; i < 9; i++) {
      const array2D: number[][] = [];
      for (let j = 0; j < 9; j++) {
        const array1D: number[] = [];
        for (let k = 0; k < 9; k++) {
          array1D.push(0);
        }
        array2D.push(array1D);
      }
      array3D.push(array2D);
    }
    setPencil(array3D);
  }, []);

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

  const [ board, setBoard ] = useState(initialBoard)

  const [showYellow, setShowYellow] = useState(false);

  const toggleYellowView = () => {
    setShowYellow((prevShowYellow) => !prevShowYellow);
  };

    const handleCellSelect = (row: any, col: any) => {
    setSelectedCell({ row, col });
  };

  return (
    <View style={styles.container}>
      {initialBoard.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((col, colIndex) => {
            return (
              <View
                key={`${rowIndex}-${colIndex}`}
                style={[styles.cell, showYellow && styles.yellowBackground]}
              >
                {!showYellow ? (
                  col === "0" ? (
                    <TextInput style={styles.normalCell}
                    maxLength={1}
                    onChangeText = {(text) =>
                        handleInputChange(text, rowIndex, colIndex)
                      }
                    style={[isCellSelected(rowIndex, colIndex) && styles.selectedCell]}
                    onFocus={() => handleCellSelect(rowIndex, colIndex)}
                    />
                  ) : (
                    <TouchableOpacity style={styles.normalCell}>
                      <Text style={styles.yellowText}>{col}</Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <View style={styles.parentContainer}>
                    {pencil &&
                      pencil[rowIndex][colIndex].map((key, index) => (
                        <View key={index} style={styles.childContainer}>
                          <Text>{index + 1}</Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
      <Button
        title={showYellow ? "Show Numbers" : "Show Yellow (Pencil)"}
        onPress={toggleYellowView}
      />

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Pressable
          key={number}
          style={styles.button}
          onPress={() => handlePress(number)}
        >
          <Text style={styles.buttonText}>{number}</Text>
        </Pressable>
      ))}
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
    width: 40,
    height: 40,
  },
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
  },
  selectedCell: {
        backgroundColor: "lightblue",
      },
});
