import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from './screens/HomeScreen';
import Sudoku from './screens/SudokuScreen';
import SudokuBoard from './components/SudokuBoard';
import { StrictMode } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AuthWrapper from './components/AuthenticationWrapper';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <AuthProvider>
      <AuthWrapper >
        <Text>hi</Text>
      </AuthWrapper>
    </AuthProvider>    
    //  <NavigationContainer>
    //    <Stack.Navigator initialRouteName='HomeScreen'>
    //     <Stack.Screen name = "HomeScreen" component={Home}/>
    //     <Stack.Screen name = "Sudoku" component={Sudoku}/>
    //   </Stack.Navigator> 

    // </NavigationContainer>
     
  //   <StrictMode>
  //   <ScrollView>
  //   <View style={styles.board}>
  //   {/* <SudokuBoard /> */}
  //   <Sandbox />
    
  // </View>
  // </ScrollView>
  // </StrictMode>
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