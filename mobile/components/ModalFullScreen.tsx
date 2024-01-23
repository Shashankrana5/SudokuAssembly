import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

export type Sudoku = {
  date: string;
  date_and_source: string;
  id: string;
  level: string;
  puzzle: string[][];
  solution: string[][];
  source: string;
};

export default function ModalFullScreen({
  modalVisible,
  setModalVisible,
  hard,
  easy,
  medium,
  navigation
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  hard: Sudoku;
  easy: Sudoku;
  medium: Sudoku;
  navigation: any
}) {
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateToDifficulty = (difficulty: string) => {

    navigation.navigate("Sudoku", {
      sudoku: (difficulty === "hard" ? hard: (difficulty === "easy" ? easy : medium))
    })
    setModalVisible(false)
  };

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalTitle}>Select a difficulty</Text>
              <TouchableOpacity
                onPress={() => navigateToDifficulty('easy')}
                style={styles.difficultyButtonEasy}
              >
                <Text style={styles.difficultyButtonText}>Easy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateToDifficulty('medium')}
                style={styles.difficultyButtonMedium}
              >
                <Text style={styles.difficultyButtonText}>Medium</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateToDifficulty('hard')}
                style={styles.difficultyButtonHard}
              >
                <Text style={styles.difficultyButtonText}>Hard</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close-outline" size={30} color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  difficultyButtonEasy: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
  },
  difficultyButtonMedium: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
  },
  difficultyButtonHard: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
  },
  difficultyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 2,
    paddingRight: 5,
  },

});
