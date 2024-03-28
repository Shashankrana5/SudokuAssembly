import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import SignUp from './Signup';
import SignIn from './SignIn';
import HomeScreen from '../screens/HomeScreen';
import SudokuScreen from '../screens/SudokuScreen';


interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    // Loading state while checking authentication
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {isAuthenticated ? (<Stack.Navigator>

        {/* <Stack.Screen name="Home" component={() => <View>{children}</View>} />
         */}
         <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
         <Stack.Screen name = "Sudoku" component={SudokuScreen}/>
      </Stack.Navigator>):
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />

      </Stack.Navigator>
      }
      {/* <Stack.Navigator> */}
        
        {/* {isAuthenticated ? (
          // Authenticated: Render the wrapped component
          <Stack.Screen name="Home" component={() => <View>{children}</View>} />
        ) : (
          // Not Authenticated: Redirect to the Sign In page
          <Stack.Screen name="SignIn" component={SignIn} />
        )} */}
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default AuthWrapper;
