// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, FlatList } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // Retrieve auth token from AsyncStorage
// // const getAuthToken = async () => {
// //   try {
// //     const authToken = await AsyncStorage.getItem('authToken');
// //     return authToken;
// //   } catch (error) {
// //     console.log(error);
// //     return null;
// //   }
// // };

// // // Make API request with auth token
// // const authToken = await getAuthToken();

// // const TaskListScreen = () => {
// //   const [tasks, setTasks] = useState([]);

// //   useEffect(() => {
// //     fetch('https://task-manager-production-872a.up.railway.app/tasks'),{
// //       headers: {
// //         'Authorization': `Bearer ${authToken}`
// //       }
// //     }
// //       .then(response => response.json(),
// //       console.log(response.json()))
// //       .then(data => setTasks(data))
// //       .catch(error => console.error(error));
// //   }, []);

// //   useEffect(() => {
// //     getTasks();
// // }, []);

// //   const getTasks = async () => {
// //     const response = await fetch(
// //       `https://task-manager-production-872a.up.railway.app/tasks`,{
// //       headers: {
// //         'Authorization': `Bearer ${authToken}`
// //       }
// //     }
// //     );
// //     const data = await response.json();
// //     setTasks(data)
// //     console.log(data);
// //   }

// // import React, { useState, useEffect } from 'react';
// // import { View, Text, FlatList, StyleSheet } from 'react-native';
// // import AsyncStorage from '@react-native-community/async-storage';
// // import axios from 'axios';
// // import { MaterialIcons } from '@expo/vector-icons';

// // const TasksScreen = () => {
// //   const [tasks, setTasks] = useState([]);

// //   const loadTasks = async () => {
// //     try {
// //       const token = await AsyncStorage.getItem('token');
// //       const res = await axios.get('http://localhost:3000/tasks', { headers: { Authorization: `Bearer ${token}` } });
// //       setTasks(res.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   useEffect(() => {
// //     loadTasks();
// //   }, []);

// //   const renderTask = ({ item }) => (
// //     <View style={styles.taskItem}>
// //       <Text style={styles.taskDescription}>{item.description}</Text>
// //       {/* <Text>{item.completed ? 'Completed' : 'Not completed'}</Text> */}
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         data={tasks}
// //         renderItem={renderTask}
// //         keyExtractor={(item) => item._id}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 10,
// //   },
// //   taskItem: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     padding: 10,
// //     backgroundColor: '#fff',
// //     borderRadius: 5,
// //     marginBottom: 10,
// //   },
// //   taskTitle: {
// //     fontWeight: 'bold',
// //   },
// // });

// // export default TaskListScreen;

// // import { Text, View } from 'react-native';
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const Tasks = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [description, setDescription] = useState('');
// //   const [completed, setCompleted] = useState(false);

// //   useEffect(() => {
// //     axios.get('/tasks').then((response) => {
// //       setTasks(response.data);
// //     });
// //   }, []);

// //   const handleAddTask = () => {
// //     axios
// //       .post('/tasks', {
// //         description,
// //         completed,
// //       })
// //       .then((response) => {
// //         setTasks([...tasks, response.data]);
// //       });
// //   };

// //   const handleDeleteTask = (id) => {
// //     axios.delete(`/tasks/${id}`).then(() => {
// //       setTasks(tasks.filter((task) => task._id !== id));
// //     });
// //   };

// //   return (
// //     <div>
// //       <h2>
// //         Tasks
// //         </h2>
// //       <ul>
// //         {tasks.map((task) => (
// //           <li key={task._id}>
// //             <Text>{task.description} - {task.completed ? 'Complete' : 'Incomplete'}</Text>
// //             <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //       <h3>Add Task</h3>
// //       <label>
// //         Description:
// //         <input
// //           type="text"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //         />
// //       </label>
// //       <label>
// //         Completed:
// //         <input
// //           type="checkbox"
// //           checked={completed}
// //           onChange={(e) => setCompleted(e.target.checked)}
// //         />
// //       </label>
// //       <button onClick={handleAddTask}>Add Task</button>
// //     </div>
// //   );
// // };

// // export default Tasks;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Text } from 'react-native'; // import the Text component from react-native

// // const Tasks = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [description, setDescription] = useState('');
// //   const [completed, setCompleted] = useState(false);

// //   useEffect(() => {
// //     axios.get('/tasks').then((response) => {
// //       setTasks(response.data);
// //     });
// //   }, []);

// //   const handleAddTask = () => {
// //     axios
// //       .post('/tasks', {
// //         description,
// //         completed,
// //       })
// //       .then((response) => {
// //         setTasks([...tasks, response.data]);
// //       });
// //   };

// //   const handleDeleteTask = (id) => {
// //     axios.delete(`/tasks/${id}`).then(() => {
// //       setTasks(tasks.filter((task) => task._id !== id));
// //     });
// //   };

// //   return (
// //     <div>
// //       <h2>Tasks</h2>
// //       <ul>
// //         {tasks.map((task) => (
// //           <li key={task._id}>
// //             <Text>{task.description} - {task.completed ? 'Complete' : 'Incomplete'}</Text>
// //             <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //       <h3>Add Task</h3>
// //       <label>
// //         Description:
// //         <input
// //           type="text"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //         />
// //       </label>
// //       <label>
// //         Completed:
// //         <input
// //           type="checkbox"
// //           checked={completed}
// //           onChange={(e) => setCompleted(e.target.checked)}
// //         />
// //       </label>
// //       <button onClick={handleAddTask}>Add Task</button>
// //     </div>
// //   );
// // };

// // export default Tasks;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Text, View, TextInput, Button, FlatList } from 'react-native';

// // const Tasks = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [description, setDescription] = useState('');
// //   const [completed, setCompleted] = useState(false);

// //   useEffect(() => {
// //     axios.get('https://task-manager-production-872a.up.railway.app/tasks').then((response) => {
// //       setTasks(response.data);
// //     });
// //   }, []);

// //   const handleAddTask = () => {
// //     axios
// //       .post('https://task-manager-production-872a.up.railway.app/tasks', {
// //         description,
// //         completed,
// //       })
// //       .then((response) => {
// //         setTasks([...tasks, response.data]);
// //       });
// //   };

// //   const handleDeleteTask = (id) => {
// //     axios.delete(`https://task-manager-production-872a.up.railway.app/tasks/${id}`).then(() => {
// //       setTasks(tasks.filter((task) => task._id !== id));
// //     });
// //   };

// //   return (
// //     <View>
// //       <Text>Tasks</Text>
// //       <FlatList
// //         data={tasks}
// //         keyExtractor={(task) => task._id}
// //         renderItem={({ item }) => (
// //           <View>
// //             <Text>
// //               {item.description} -{' '}
// //               {item.completed ? <Text>Complete</Text> : <Text>Incomplete</Text>}
// //             </Text>
// //             <Button onPress={() => handleDeleteTask(item._id)} title="Delete" />
// //           </View>
// //         )}
// //       />
// //       <Text>Add Task</Text>
// //       <TextInput
// //         value={description}
// //         onChangeText={(text) => setDescription(text)}
// //       />
// //       <View>
// //         <Text>Completed:</Text>
// //         <Button
// //           onPress={() => setCompleted(!completed)}
// //           title={completed ? 'Completed' : 'Incomplete'}
// //         />
// //       </View>
// //       <Button onPress={handleAddTask} title="Add Task" />
// //     </View>
// //   );
// // };

// // export default Tasks;

// import React, { useState, useEffect, TouchableOpacity } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const TaskListScreen = () => {
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     const token = await AsyncStorage.getItem('token');
//     const res = await fetch(
//       `https://task-manager-production-872a.up.railway.app/tasks?sortBy:asc&completed:false`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const data = await res.json();
//     setTasks(data);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleTaskPress = (task) => {
//     navigation.navigate('EditTask', task);
//   };

//   const handleTaskDelete = async (taskId) => {
//     const token = await AsyncStorage.getItem('authToken');
//     const headers = { Authorization: `Bearer ${token}` };
//     const res = await fetch(`'https://task-manager-production-872a.up.railway.app/tasks/${taskId}`, {
//       method: 'DELETE',
//       headers,
//     });
//     if (res.ok) {
//       setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
//     } else {
//       console.log('Error:', res.status);
//     }
//   };

// //   const renderItem = ({ item }) => <Text>{item.description}</Text>;
//  const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => handleTaskPress(item)}
//       onLongPress={() => handleTaskDelete(item._id)}
//       style={{ padding: 10, borderBottomWidth: 1 }}
//     >
//       <Text style={{ fontSize: 18 }}>{item.description}</Text>
//       <Text>{item.completed ? 'Completed' : 'Incomplete'}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View>
//       <Text>Task List</Text>
//       <FlatList
//         data={tasks}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//       />
//     </View>
//   );
// };

// export default TaskListScreen;

//
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, BackHandler } from "react-native";
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const TaskListScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [tasks, setTasks] = useState([]);

  const fetchTaskList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://task-manager-production-872a.up.railway.app/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch task list");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchTaskList();
    }, [])
  );

  const sortByPriority = (taskList) => {
    const sortedList = taskList.sort((a, b) => {
      if (a.completed === b.completed) {
        if (a.priority === b.priority) {
          if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
        }
        return b.priority - a.priority;
      }
      return a.completed - b.completed;
    });
    return sortedList;
  };

  const handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBarLeft}>
        <Button
          title="Profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
      <View style={styles.navBarRight}>
        <Button
          title="Add Task"
          onPress={() => navigation.navigate("Add Task")}
        />
      </View>
      <View style={styles.taskViewContainer}>
        <ScrollView>
          {/* {tasks.map((task) => ( */}
          {sortByPriority(tasks).map((task) => (
            <View key={task._id} style={styles.taskContainer}>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.completed}>
                {task.completed ? "Completed" : "Incomplete"}
              </Text>
              <Text style={styles.dueDate}>
                Due Date:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "no due date given"}
              </Text>
              <Button
                title="View Details"
                onPress={() => navigation.navigate("Task Detail", { task })}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navBarLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 0,
  },
  navBarRight: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
  },
  taskViewContainer: {
    flex: 1,
    top: 20,
    marginBottom: 10,
  },
  taskContainer: {
    top: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  dueDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  priority: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TaskListScreen;
