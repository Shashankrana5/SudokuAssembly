import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";

export default function SudokuInputButton({handlePress}: any) {

    return (
        <View style={styles.inputContainer}>
        <View style={styles.gridContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.button}
              onPress={() => handlePress(number)}
            >
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
}

const styles = StyleSheet.create({

  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", 
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "70%",
    justifyContent: "center",
  },
  button: {
    width: "30%",
    aspectRatio: 1, 
    margin: "1%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000", 
    borderRadius: 8, 
  },
  buttonText: {
    fontSize: 24, 
  },
})