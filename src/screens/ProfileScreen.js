import React, { useState, useEffect, Button } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const defaultImageUri =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"; // Replace with your default image URL
  const [imageUri, setImageUri] = useState(defaultImageUri);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");
        const response = await fetch(
          "https://task-manager-production-872a.up.railway.app/users/me",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      await fetch(
        "https://task-manager-production-872a.up.railway.app/users/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      await fetch(
        "https://task-manager-production-872a.up.railway.app/users/me",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      await AsyncStorage.removeItem("token");
      navigation.navigate("Signup");
    } catch (error) {
      console.error(error);
    }
  };
  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          setImageUri(defaultImageUri);
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          setImageUri(response.uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
        <Avatar
          size="xlarge"
          rounded
          source={{ uri: imageUri || defaultImageUri }}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UpdateProfile", { user })}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Task Manager", { user })}
      >
        <Text style={styles.buttonText}>Task Manager</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    margin: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
