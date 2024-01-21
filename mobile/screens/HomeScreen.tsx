import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeTab from "../tabs/HomeTab";
import ProfileTab from "../tabs/ProfileTab";

export default function HomeScreen({ navigation, route }: any) {
  const homeName = "Home";
  const profileName = "Profile";

  const Tab = createBottomTabNavigator();

  // const { notifications } = useContext(NotificationContext);

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === homeName) {
            iconName = focused ? "home" : "home-outline";
          }
          else if (route.name === profileName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          //@ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
        tabBarBadgeStyle: {
          backgroundColor: "red",
        },
      })}
    >
      <Tab.Screen
        name={homeName}
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={profileName}
        component={ProfileTab}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}