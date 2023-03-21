// import React, { useState, Switch } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const EditTaskScreen = ({ route, navigation }) => {
//   const [description, setDescription] = useState(route.params.description);
//   const [completed, setCompleted] = useState(route.params.completed);

//   const handleSubmit = async () => {
//     const token = await AsyncStorage.getItem('token');
//     const headers = { Authorization: `Bearer ${token}` };
//     const res = await fetch(`'https://task-manager-production-872a.up.railway.app/tasks/${route.params._id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json', ...headers },
//       body: JSON.stringify({ description, completed }),
//     });
//     if (res.ok) {
//       navigation.goBack();
//     } else {
//       console.log('Error:', res.status);
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Edit Task</Text>
//       <TextInput
//         style={{ marginTop: 20, padding: 10, borderWidth: 1, borderRadius: 5 }}
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//         placeholder="Description"
//       />
//       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
//         <Text style={{ marginRight: 10 }}>Completed:</Text>
//         <Switch value={completed} onValueChange={(value) => setCompleted(value)} />
//       </View>
//       <Button title="Save" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default EditTaskScreen;

// import React, { useState, useEffect, Switch } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const UpdateTaskScreen = ({ navigation, route }) => {
//   const [description, setDescription] = useState('');
//   const [completed, setCompleted] = useState(false);

//   useEffect(() => {
//     const { task } = route.params;
//     setDescription(task.description);
//     setCompleted(task.completed);
//   }, []);

//   const handleUpdateTask = async () => {
//     const { task } = route.params;
//     const token = await AsyncStorage.getItem('token');
//     const response = await fetch(`https://task-manager-production-872a.up.railway.app/tasks/${task._id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         description,
//         completed,
//       }),
//     });

//     if (response.ok) {
//       Alert.alert('Task updated successfully!');
//       navigation.goBack();
//     } else {
//       Alert.alert('Error updating task. Please try again.');
//     }
//   };

//   const handleDeleteTask = async () => {
//     const { task } = route.params;
//     const token = await AsyncStorage.getItem('token');
//     const response = await fetch(`https://task-manager-production-872a.up.railway.app/tasks/${task._id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       Alert.alert('Task deleted successfully!');
//       navigation.goBack();
//     } else {
//       Alert.alert('Error deleting task. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Update Task</Text>
//       <TextInput
//         value={description}
//         onChangeText={setDescription}
//         placeholder="Task Description"
//       />
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Text>Completed?</Text>
//         <Switch value={completed} onValueChange={setCompleted} />
//       </View>
//       <Button title="Update Task" onPress={handleUpdateTask} />
//       <Button title="Delete Task" onPress={handleDeleteTask} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//     width: '100%',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 20,
//   },
// });

// export default UpdateTaskScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const UpdateTaskScreen = ({ navigation, route }) => {
//   // const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     // Retrieve the task data from the route params and update the state
//     //setTitle(route.params.title);
//     const fetchData = async () => {
//       try {
//         const auth_token = await AsyncStorage.getItem('token');
//         const response = await fetch(`https://task-manager-production-872a.up.railway.app/tasks/${route.params.id}`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${auth_token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();
//         setDescription(data.description);
//         setCompleted(data.completed);
//       } catch (err) {
//         setErrorMessage('Unable to fetch description. Please try again later.');
//       }
//     };
//     fetchData();
//   }, []);
//   //   setDescription(route.params.description);
//   // }, [route.params]);

//   const handleUpdateTask = async () => {
//     // Get the token from async storage
//     try {
//       const token = await AsyncStorage.getItem('token');

//       // Send the update request to the backend API
//       const response = await fetch(`https://task-manager-production-872a.up.railway.app/tasks/${route.params.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           description,
//           completed
//         })
//       });
//       const data = await response.json();
//       if (response.ok) {
//         // Navigate back to the task list screen if the update was successful
//         navigation.navigate('TaskList');
//       } else {
//         // Display an error message if the update failed
//         setErrorMessage(data.message);
//       }
//     }
//     catch (err) {
//       setErrorMessage('Unable to update profile. Please try again later.');
//     }
//   };

//   const handleDeleteTask = async () => {
//     // Get the token from async storage
//     const token = await AsyncStorage.getItem('token');

//     // Send the delete request to the backend API
//     const response = await fetch(`https://task-manager-production-872a.up.railway.app/tasks/${route.params.id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     if (response.ok) {
//       // Navigate back to the task list screen if the delete was successful
//       navigation.navigate('TaskList');
//     } else {
//       // Display an error message if the delete failed
//       console.log('Delete failed');
//     }
//   };

//   return (
//     <View>
//       {/* <Text>Title:</Text>
//       <TextInput value={title} onChangeText={setTitle} /> */}

//       <Text>Description:</Text>
//       {errorMessage ? (
//         <Text style={styles.error}>{errorMessage}</Text>
//       ) : null}
//       <TextInput value={description} onChangeText={setDescription} />

//       <Button title="Update Task" onPress={handleUpdateTask} />
//       <Button title="Delete Task" onPress={handleDeleteTask} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//     width: '100%',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 20,
//   },
// });

// export default UpdateTaskScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';

// const UpdateTaskScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const {task} = route.params;
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [priority, setPriority]  = useState('');
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   useEffect(() => {
//     const fetchTaskDetails = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const response = await fetch(`https://task-manager-production-872a.up.railway.app/tasks/${route.params.id}`, {
//           method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         Alert.alert('Error', errorData.error);
//         return;
//       }
//       const task = await response.json();
//       setTitle(task.title);
//       setDescription(task.description);
//       setDueDate(task.dueDate);
//       setPriority(task.priority);
//     }catch (error){
//       console.log(error)
//     }
//     };

//     fetchTaskDetails();
//   }, []);

//   const handleUpdateTask = async () => {
//     const token = await AsyncStorage.getItem('token');
//     const updates = {};

//     if (title) {
//       updates.title = title;
//     }

//     if (description) {
//       updates.description = description;
//     }

//     if (priority) {
//       updates.priority = priority;
//     }

//     if (dueDate) {
//       updates.dueDate = dueDate;
//     }

//     const response = await fetch(`https://task-manager-production-872a.up.railway.app/tasks/${route.params.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(updates),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       Alert.alert('Error', errorData.error);
//       return;
//     }

//     const updatedTask = await response.json();
//     Alert.alert('Success', 'Task updated successfully!');
//     setTitle(updatedTask.title);
//     setDescription(updatedTask.description);
//     setDueDate(updatedTask.dueDate);
//     setPriority(updatedTask.priority);
//     navigation.goBack();
//   };

//   const handleConfirmDate = (date) => {
//     setDueDate(date);
//     hideDatePicker();
//   };

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };
// console.log(task._id);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Title</Text>
//       <TextInput
//         style={styles.input}
//         placeholder={task.title}
//         value={title}
//         onChangeText={setTitle}
//       />
//       <Text style={styles.label}>Task Description</Text>
//       <TextInput
//         placeholder={task.description}
//         style={styles.input}
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//       />
//       <Text style={styles.label}>Due Date</Text>
//       <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
//         <Text style={styles.datePickerButtonText}>{dueDate ? dueDate.toLocaleString() : 'Select a due date'}</Text>
//       </TouchableOpacity>
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirmDate}
//         onCancel={hideDatePicker}
//       />
//       <Text style={styles.label}>Priority</Text>
//       <Picker
//         style={styles.picker}
//         selectedValue={priority}
//         onValueChange={(itemValue) => setPriority(itemValue)}
//       >
//         <Picker.Item label="High" value="high" />
//         <Picker.Item label="Normal" value="normal" />
//         <Picker.Item label="Low" value="low" />
//       </Picker>

//       <Button title="Save Changes" onPress={handleUpdateTask} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     marginBottom: 20,
//   },
// });

// export default UpdateTaskScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../components/api";

const UpdateTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));
  const [priority, setPriority] = useState(task.priority);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleUpdateTask = async () => {
    const token = await AsyncStorage.getItem("token");
    const updates = {};

    if (title) {
      updates.title = title;
    }

    if (description) {
      updates.description = description;
    }

    if (priority) {
      updates.priority = priority;
    }

    if (dueDate) {
      updates.dueDate = dueDate.toISOString();
    }

    const response = await fetch(`${BASE_URL}/tasks/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      Alert.alert("Error", errorData.error);
      return;
    }

    const updatedTask = await response.json();
    Alert.alert("Success", "Task updated successfully!");
    setTitle(updatedTask.title);
    setDescription(updatedTask.description);
    setDueDate(new Date(updatedTask.dueDate));
    setPriority(updatedTask.priority);
    navigation.goBack();
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatePicker}
      >
        <Text style={styles.datePickerButtonText}>
          {dueDate.toLocaleString()}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />

      <Text style={styles.label}>Priority</Text>
      <Picker
        style={styles.picker}
        selectedValue={priority}
        onValueChange={setPriority}
      >
        <Picker.Item label="High" value="high" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Low" value="low" />
      </Picker>

      <Button title="Save Changes" onPress={handleUpdateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
  },
});

export default UpdateTaskScreen;
