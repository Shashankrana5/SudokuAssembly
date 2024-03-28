import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  Image,
  AspectRatio,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

type LoginRequest = {
  username: string;
  password: string;
};

function SignIn() {
  const navigation = useNavigation();
  const { setAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const handleSignin = async () => {
    try {
      console.log("https://sudokuassembly.com/api/auth/signin");
      const response = await axios.post(
        "https://sudokuassembly.com/api/auth/signin",
        {
          username: loginRequest?.username,
          password: loginRequest?.password,
        }
      );
      if (response.status == 200) {
        setError("");
        setAuthenticated(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setError("Invalid credntials, please try again");
          // You can perform specific actions for 401 errors here
        } else {
          // Handle other errors
          console.error(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.LoginText}>Login</Text>
      </View>
      <View style={styles.text2}>
        <Text>Don't have an account? </Text>
      </View>

      {/* Username or Email Input Field */}
      <View style={styles.buttonStyle}>
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="user-secret" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            placeholder="Username or Email"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(text) => {
              setLoginRequest({ ...loginRequest, username: text });
            }}
            value={loginRequest !== null ? loginRequest.username : ""}
          />
        </View>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            secureTextEntry={true}
            placeholder="Password"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(text) => {
              setLoginRequest({ ...loginRequest, password: text });
            }}
            value={loginRequest !== null ? loginRequest.password : ""}
          />
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonStyle}>
        <Button
          style={styles.buttonDesign}
          onPress={() => {
            if (loginRequest) handleSignin();
          }}
        >
          LOGIN
        </Button>
      </View>

      {/* Line */}
      <View style={styles.lineStyle}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>Or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>

      {/* Box */}
      <View style={styles.boxStyle}>
        <Box
          // onPress={() => navigation.navigate("#")}  // for navigation
          style={{ height: 80, width: 80 }}
          shadow={3}
          _light={{
            backgroundColor: "gray.50",
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              roundedTop="lg"
              width={20}
              height={20}
              source={require("../assets/google-logo.png")}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Box
          // onPress={() => navigation.navigate("#")}  // for navigation
          style={styles.imageStyle}
          shadow={3}
          _light={{
            backgroundColor: "gray.50",
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              roundedTop="lg"
              width={20}
              height={20}
              source={require("../assets/facebook-logo.png")}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Box
          // onPress={() => navigation.navigate("#")}  // for navigation
          style={styles.imageStyle}
          shadow={3}
          _light={{
            backgroundColor: "gray.50",
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
        >
          <AspectRatio>
            <Image
              roundedTop="lg"
              width={20}
              height={20}
              source={require("../assets/apple-logo.png")}
            />
          </AspectRatio>
        </Box>
        <Box
          // onPress={() => navigation.navigate("#")}  // for navigation
          style={styles.imageStyle}
          shadow={3}
          _light={{
            backgroundColor: "gray.50",
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              roundedTop="lg"
              width={20}
              height={20}
              source={require("../assets/twitter-logo.png")}
              alt="image"
            />
          </AspectRatio>
        </Box>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <SignIn />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: "#026efd",
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  boxStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "space-around",
  },
  errorText: {
    color: "pink",
    marginTop: 10,
  },
});
