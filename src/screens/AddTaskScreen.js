// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddTaskScreen = () => {
//   const [description, setDescription] = useState('');

//   const handleSubmit = async () => {
//     const token = await AsyncStorage.getItem('token');
//     await fetch('https://task-manager-production-872a.up.railway.app/tasks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         title,
//         description,
//         priority,
//         dueDate
//        }),
//     });
//     setDescription('');
//   };

//   return (
//     <View>
//       <Text>Add Task</Text>
//       <TextInput
//         placeholder="Enter task description"
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//       />
//       <TextInput
//         placeholder="Enter task description"
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//       />
//       <TextInput
//         placeholder="Enter task description"
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//       />
//       <TextInput
//         placeholder="Enter task description"
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//       />
//       <Button title="Add" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default AddTaskScreen;

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddTaskScreen = ({ navigation }) => {
//   const [description, setDescription] = useState('');
//   const [title, setTitle] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [priority, setPriority] = useState('');

//   const handleAddTask = async() => {
//     const token = await AsyncStorage.getItem('token');
//     await fetch('https://task-manager-production-872a.up.railway.app/tasks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         title,
//         description,
//         priority,
//         dueDate
//        }),
//     });
//     navigation.goBack();

//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Task</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Due Date"
//         value={dueDate}
//         onChangeText={setDueDate}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Priority"
//         value={priority}
//         onChangeText={setPriority}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleAddTask}>
//         <Text style={styles.buttonText}>Add Task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: 'blue',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// export default AddTaskScreen;
import { BASE_URL } from "../components/api";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import DateField from "react-native-datefield";
import DateTimePicker from "react-native-modal-datetime-picker";
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState("medium");

  const handleAddTask = async () => {
    // const newTask = {
    //   title,
    //   description,
    //   completed: false,
    //   dueDate,
    //   priority,
    // };
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const newTask = {
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };
    try {
      const res = await axios.post(`${BASE_URL}/tasks`, newTask, config);
      navigation.navigate("TaskList");
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmDate = (date) => {
    setDueDate(date);
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // const handleBackPress = () => {
  //   BackHandler.exitApp();
  //   return true;
  // }

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  //   return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  // }, []);
  const areAllFieldsFilled = title != "" && description != "";
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatePicker}
      >
        <Text style={styles.datePickerButtonText}>
          {dueDate ? dueDate.toLocaleString() : "Select a due date"}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      <DateField
        disabled
        minimumDate={new Date()}
        styleInput={{ fontSize: 15 }}
        containerStyle={{ marginVertical: 20 }}
        onSubmit={(value) => setDueDate(value)}
      />

      <Text style={styles.label}>Priority</Text>
      <Picker
        style={styles.picker}
        selectedValue={priority}
        onValueChange={(itemValue) => setPriority(itemValue)}
      >
        <Picker.Item label="High" value="high" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Low" value="low" />
      </Picker>

      <Button
        title="Add Task"
        disabled={!areAllFieldsFilled}
        onPress={handleAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  datePickerButtonText: {
    color: "#555",
  },
  picker: {
    marginBottom: 10,
  },
});

export default AddTaskScreen;
