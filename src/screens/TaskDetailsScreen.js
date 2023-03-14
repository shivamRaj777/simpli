// // import React, { useState, useEffect } from 'react';
// // import { View, Text, Button, StyleSheet } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const TaskDetailsScreen = ({ route }) => {
// //   const navigation = useNavigation();
// //   const { task } = route.params;
// //   [task, setTask] = task;
// //   const [completed, setCompleted] = useState(task.completed);

// //   useEffect(() => {
// //     // Update the task status in Async Storage whenever the completed state changes
// //     const updateTaskStatus = async () => {
// //       try {
// //         const token = await AsyncStorage.getItem('token');
// //         const response = await fetch(`https://task-manager-production-872a.up.railway.app/tasks/${task._id}`, {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': `Bearer ${token}`
// //           }
// //         });
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch task details');
// //         }
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //     updateTaskStatus();
// //   }, [completed, task]);
// //   const handleToggleComplete = () => {
// //     setTask((prevTask) => ({ ...prevTask, completed: !prevTask.completed }));
// //   };

// //   useEffect(() => {

// //   }, [task.completed, navigation]);

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>{task.title}</Text>
// //       <Text style={styles.description}>{task.description}</Text>
// //       <Text style={styles.dueDate}>Due Date: {task.dueDate}</Text>
// //       <Text style={styles.priority}>Priority: {task.priority}</Text>
// //       <Button
// //           title={task.completed ? 'Mark Incomplete' : 'Mark Complete'}
// //           onPress={handleToggleComplete}
// //         />
// //       </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20
// //   },
// //   title: { borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 10,
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 10
// //   },
// //   description: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 10,
// //     fontSize: 18,
// //     marginBottom: 10
// //   },
// //   dueDate: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 10,
// //     fontSize: 16,
// //     marginBottom: 10
// //   },
// //   priority: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 10,
// //     fontSize: 16,
// //     marginBottom: 10
// //   },
// //   toggleContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: 20
// //   },
// //   toggleLabel: {
// //     fontSize: 16,
// //     marginRight: 10
// //   }
// // });

// // export default TaskDetailsScreen;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';

// const TaskDetailScreen = ({ task }) => {
//   const [completed, setCompleted] = useState(task.completed);

//   const handleToggleComplete = async () => {
//     try {
//       // Make a PATCH request to update the task status on the backend
//       const response = await fetch(`https://https://task-manager-production-872a.up.railway.app/tasks/${task._id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ completed: !completed }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update task status');
//       }

//       // Update the completed state of the component
//       setCompleted(!completed);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{task.title}</Text>
//       <Text style={styles.description}>{task.description}</Text>
//       <Text style={styles.dueDate}>Due Date: {task.dueDate.toLocaleDateString()}</Text>
//       <Text style={styles.priority}>Priority: {task.priority}</Text>
//       <View style={styles.toggleContainer}>
//         <Text style={styles.toggleLabel}>Mark as Completed:</Text>
//         <Button
//           title={completed ? 'Completed' : 'Incomplete'}
//           onPress={handleToggleComplete}
//           color={completed ? '#4CAF50' : '#F44336'}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   dueDate: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   priority: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   toggleLabel: {
//     fontSize: 16,
//     marginRight: 10,
//   },
// });

// export default TaskDetailScreen;

import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskDetailsScreen = ({ route }) => {
  const [task, setTask] = useState(route.params.task);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [completed, setCompleted] = useState(task.completed);

  // Update the task status in Async Storage whenever the completed state changes

  const fetchTaskDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://task-manager-production-872a.up.railway.app/tasks/${task._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch task details");
      }
      const tasks = await response.json();
      setTask(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://task-manager-production-872a.up.railway.app/tasks/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    updateTaskStatus();
  }, [completed, task]);

  useFocusEffect(
    React.useCallback(() => {
      fetchTaskDetails();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.navBarRight}>
        <Button
          title="Update Task"
          onPress={() => navigation.navigate("Update Task", { task })}
        />
      </View>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.dueDate}>
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </Text>
      <Text style={styles.priority}>Priority: {task.priority}</Text>
      <Text style={styles.priority}>
        status: {task.completed ? "Completed" : "Incomplete"}
      </Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Mark as</Text>
        <Button
          title={!completed ? "Completed" : "Incomplete"}
          onPress={() => {
            setCompleted(!completed), navigation.goBack("TaskList");
          }}
          color={!completed ? "#4CAF50" : "#F44336"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarRight: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "baseline",
    padding: 20,
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

    padding: 10,
  },
  priority: {
    fontSize: 16,
    marginBottom: 10,

    padding: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default TaskDetailsScreen;
