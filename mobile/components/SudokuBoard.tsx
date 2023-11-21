// import React, { useState } from "react";
// import { View, TextInput, StyleSheet } from "react-native";

// const SudokuBoard = () => {
//   const initialBoard = [
//     [5, 3, 0, 0, 7, 0, 0, 0, 0],
//     [6, 0, 0, 1, 9, 5, 0, 0, 0],
//     [0, 9, 8, 0, 0, 0, 0, 6, 0],
//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1],
//     [7, 0, 0, 0, 2, 0, 0, 0, 6],
//     [0, 6, 0, 0, 0, 0, 2, 8, 0],
//     [0, 0, 0, 4, 1, 9, 0, 0, 5],
//     [0, 0, 0, 0, 8, 0, 0, 7, 9],
// ];
//   const [board, setBoard] = useState(initialBoard);
//   const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });

//   const handleInputChange = (value: any, row: any, col: any) => {
//     const newBoard = [...board];
//     newBoard[row][col] = value === "" ? "0" : value;
//     setBoard(newBoard);
//   };

//   const handleCellSelect = (row: any, col: any) => {
//     setSelectedCell({ row, col });
//   };

//   const isCellSelected = (row: any, col: any) => {
//     return (
//       row === selectedCell.row || col === selectedCell.col
//     );
//   };

//   return (
//     <View style={styles.boardContainer}>
//     <View style={styles.container}>
//       {board.map((row, rowIndex) => (
//         <View key={rowIndex} style={styles.row}>
//           {row.map((cell, colIndex) => (
//             <TextInput
//               key={colIndex}
//               style={[
//                 styles.cell,
//                 isCellSelected(rowIndex, colIndex) && styles.selectedCell,
//               ]}
//               onChangeText={(text) => handleInputChange(text, rowIndex, colIndex)}
//               onFocus={() => handleCellSelect(rowIndex, colIndex)}
//               value={board[rowIndex][colIndex].toString()}
//               keyboardType="numeric"
//               maxLength={1}
//             />
//           ))}
//         </View>
//       ))}
//     </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     boardContainer: {
//         // flex: 1
//     },
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 200
//   },
//   row: {
//     flexDirection: "row",
//   },
//   cell: {
//     borderWidth: 1,
//     borderColor: "black",
//     width: 30,
//     height: 30,
//     textAlign: "center",
//   },
//   selectedCell: {
//     backgroundColor: "lightblue",
//   },
// });

// export default SudokuBoard;

//@ts-nocheck

import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

const SudokuBoard = () => {
  const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
[6, 0, 0, 1, 9, 5, 0, 0, 0],
[0, 9, 8, 0, 0, 0, 0, 6, 0],
[8, 0, 0, 0, 6, 0, 0, 0, 3],
[4, 0, 0, 8, 0, 3, 0, 0, 1],
[7, 0, 0, 0, 2, 0, 0, 0, 6],
[0, 6, 0, 0, 0, 0, 2, 8, 0],
[0, 0, 0, 4, 1, 9, 0, 0, 5],
[0, 0, 0, 0, 8, 0, 0, 7, 9],

  ];


  const [board, setBoard] = useState(initialBoard);
  const [showInput, setShowInput] = useState(true);

  const handleInputChange = (value, row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = value === "" ? "0" : value;
    setBoard(newBoard);
  };

  const toggleInputView = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View key={colIndex} style={styles.cellContainer}>
              {showInput ? (
                <TextInput
                  style={styles.cell}
                  onChangeText={(text) =>
                    handleInputChange(text, rowIndex, colIndex)
                  }
                  value={board[rowIndex][colIndex].toString()}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ) : (
                <View style={[styles.cell, styles.viewUnderneath]} />
              )}
            </View>
          ))}
        </View>
      ))}
      <Button
        title={showInput ? "Show View" : "Show Input"}
        onPress={toggleInputView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 500,
  },
  row: {
    flexDirection: "row",
  },
  cellContainer: {
    position: "relative",
  },
  cell: {
    borderWidth: 1,
    borderColor: "black",
    width: 30,
    height: 30,
    textAlign: "center",
  },
  viewUnderneath: {
    backgroundColor: "lightgreen",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SudokuBoard;