import { Button, StyleSheet, Text, View } from "react-native";

export default function Home ({navigation}: any) {

    return (
        <View style={styles.viewbasic}>
            <Text>this is the home page</Text>
            <Button
                title="Go to Another Screen"
                onPress={() => navigation.navigate("Sudoku")}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      flexDirection: "row",
    },
    cell: {
      borderWidth: 1,
      borderColor: "black",
      width: 30,
      height: 30,
      textAlign: "center",
    },
    selectedCell: {
      backgroundColor: "lightblue",
    },
    viewbasic:{
        backgroundColor: "yellow"
    }
  });