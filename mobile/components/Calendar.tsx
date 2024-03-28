import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarPicker, {
  CustomDatesStylesFunc,
  CustomDayHeaderStylesFunc,
} from "react-native-calendar-picker";
import ModalFullScreen from "./ModalFullScreen";

const Calendar = ({ navigation }: any) => {
  const [sudokus, setSudokus] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [easy, setEasy] = useState<any>(null);
  const [medium, setMedium] = useState<any>(null);
  const [hard, setHard] = useState<any>(null);

  useEffect(() => {
    const fetchSudokus = async () => {
      const response = await fetch(
        // "http://localhost:9090/api/sudoku/search-mobile"
        "https://sudokuassembly.com/api/sudoku/search-mobile"
      );
      const json = await response.json();

      setSudokus(json);
    };
    fetchSudokus();
  }, []);

  const customDatesStylesCallback: CustomDatesStylesFunc = (date: Date) => {
    const today = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    if (
      formattedDate + "-easy" in sudokus ||
      formattedDate + "-medium" in sudokus ||
      formattedDate + "-hard" in sudokus
    ) {
      const isToday = date.toDateString() === today.toDateString();

      return {
        style: {
          backgroundColor: isToday ? "purple" : "grey",
        },
        textStyle: {
          color: isToday ? "white" : "white",
          fontWeight: "bold",
        },
      };
    }

    return {};
  };

  const handleDateChange = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    if (
      formattedDate + "-easy" in sudokus ||
      formattedDate + "-medium" in sudokus ||
      formattedDate + "-hard" in sudokus
    ) {
      setEasy(sudokus[formattedDate + "-easy"]);
      setHard(sudokus[formattedDate + "-hard"]);
      setMedium(sudokus[formattedDate + "-medium"]);

      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {sudokus && (
        <CalendarPicker
          customDatesStyles={customDatesStylesCallback}
          onDateChange={handleDateChange}
        />
      )}
      <ModalFullScreen
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        hard={hard}
        easy={easy}
        medium={medium}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
});

export default Calendar;
