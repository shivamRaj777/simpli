import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TaskListScreen from './src/screens/TaskListScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';
import TaskManagerScreen from './src/screens/TaskManagerScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import UpdateTaskScreen from './src/screens/UpdateTaskScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'TaskList' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{title: 'Update Profile'}} />
        <Stack.Screen name="Task Manager" component={TaskManagerScreen} options={{title: 'Task Manager'}} />
        <Stack.Screen name="Add Task" component={AddTaskScreen} options={{title: 'Add Task'}} />
        <Stack.Screen name="Update Task" component={UpdateTaskScreen} options={{title: 'Update Task'}} />
        <Stack.Screen name="Task Detail" component={TaskDetailsScreen} options={{title: 'Task Detail'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
