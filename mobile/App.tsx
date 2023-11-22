import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from './screens/Home';
import Sudoku from './screens/Sudoku';
import SudokuBoard from './components/SudokuBoard';
import Sandbox from './components/Sandbox';
import { StrictMode } from 'react';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    
    //  <NavigationContainer>
    //    <Stack.Navigator initialRouteName='Home'>
    //     <Stack.Screen name = "Home" component={Home}/>
    //     <Stack.Screen name = "Sudoku" component={Sudoku}/>
    //   </Stack.Navigator>  */}

    // </NavigationContainer> 
    <StrictMode>
    <ScrollView>
    <View style={styles.board}>
    {/* <SudokuBoard /> */}
    <Sandbox />
    
  </View>
  </ScrollView>
  </StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  board: {
    backgroundColor:"orange"
  },
});