import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskListScreen from "./src/screens/TaskListScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import UpdateProfileScreen from "./src/screens/UpdateProfileScreen";
import TaskManagerScreen from "./src/screens/TaskManagerScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import UpdateTaskScreen from "./src/screens/UpdateTaskScreen";
import TaskDetailsScreen from "./src/screens/TaskDetailsScreen";
import { Text, Platform } from "react-native-elements";
//notification
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const App = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      saveDeviceToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function saveDeviceToken(token) {
    try {
      await AsyncStorage.setItem("deviceToken", token);
      console.log("Device token saved successfully");
    } catch (error) {
      console.log("Error saving device token", error);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: "TaskList" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfileScreen}
          options={{ title: "Update Profile" }}
        />
        <Stack.Screen
          name="Task Manager"
          component={TaskManagerScreen}
          options={{ title: "Task Manager" }}
        />
        <Stack.Screen
          name="Add Task"
          component={AddTaskScreen}
          options={{ title: "Add Task" }}
        />
        <Stack.Screen
          name="Update Task"
          component={UpdateTaskScreen}
          options={{ title: "Update Task" }}
        />
        <Stack.Screen
          name="Task Detail"
          component={TaskDetailsScreen}
          options={{ title: "Task Detail" }}
        />
      </Stack.Navigator>
      <Text>Your Expo push token:{expoPushToken}</Text>
    </NavigationContainer>
  );
};
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default App;
