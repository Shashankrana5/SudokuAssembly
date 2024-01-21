import { Text, View } from "react-native";
import SudokuBoard from "../components/SudokuBoard";


export default function SudokuScreen ({route}:any) {
    const { sudoku } = route.params;

    return (
        <View>
            <SudokuBoard sudoku={sudoku}/>
        </View>
    )
}