import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../components/api";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const deviceToken = await AsyncStorage.getItem("deviceToken");
    console.log(deviceToken);

    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email: email,
        password: password,
        deviceToken,
      });
      const token = response.data.token ? response.data.token : "";
      await AsyncStorage.setItem("token", token);
      navigation.navigate("TaskList");
    } catch (error) {
      console.error(error);
    }
  };

  const areAllFieldsFilleds = email != "" && password.length >= 7;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Button
        style={styles.button}
        title="Login / Signin"
        disabled={!areAllFieldsFilleds}
        onPress={handleLogin}
      />
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
