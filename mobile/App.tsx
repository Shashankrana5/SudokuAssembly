import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from 'react-native';

import SudokuScreen from "./screens/SudokuScreen";

import { View } from "react-native";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthWrapper from "./components/AuthenticationWrapper";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  return (
<AuthProvider> 
    <AuthWrapper>
      <HomeScreen />
    </AuthWrapper>
    </AuthProvider>
  );
}
