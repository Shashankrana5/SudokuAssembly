import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

const PencilEraserButton = ({pencilOn, setPencilOn, pencil, selectedCell, setPencil, handlePress}: any) => {

  const handlePencilPress = () => {
    setPencilOn((prevState:boolean) => !prevState);
  };
  const handleEraserPress = () => {
    if (selectedCell.row !== -1 && selectedCell.col !== -1){
      console.log("here");
      setPencil((prevPencil: any) => {
        for(let i = 0; i < 9; i++)
        prevPencil[selectedCell.row][selectedCell.col][i] = 0;

        return prevPencil
      })
      
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePencilPress}>
        <View style={styles.button}>
        <MaterialCommunityIcons name="pencil" size={28} color="#555" />
          {pencilOn ? (
            <Text style={styles.statusOn}>ON</Text>
          ) : (
            <Text style={styles.statusOff}>OFF</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("-1", -1, true)}>
        <View style={styles.button}>
        <MaterialCommunityIcons name="eraser" size={28} color="#555" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
    top: 15
  },
  button: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusOn: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "green",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 15,
    fontSize: 14,
    textTransform: "uppercase",
    zIndex: 1,
  },
  statusOff: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 15,
    fontSize: 14,
    textTransform: "uppercase",
    zIndex: 1,
  },
});

export default PencilEraserButton;
