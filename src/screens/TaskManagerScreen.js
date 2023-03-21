import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BASE_URL } from "../components/api";

const TaskManagerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Manage ur Task</Text>
      <View style={styles.button}>
        <Button
          title="View Tasks"
          onPress={() => navigation.navigate("TaskList")}
        />
      </View>
      <Button
        title="Add Task"
        onPress={() => navigation.navigate("Add Task")}
      />
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
    marginBottom: 24,
  },
  button: {
    margin: 10,
  },
});

export default TaskManagerScreen;
