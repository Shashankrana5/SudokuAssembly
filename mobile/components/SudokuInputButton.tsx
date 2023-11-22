import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";

export default function SudokuInputButton({ handlePress }: any) {
  return (
    <View style={styles.mainContainer}>

    <View style={styles.inputContainer}>
      <View style={styles.gridContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.button}
            onPress={() => handlePress(number, number - 1)}
          >
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    
    backgroundColor: "yellow",
    width: 250,
    padding: 0,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    padding: 0,
    margin: 0,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 24,
  },
});
