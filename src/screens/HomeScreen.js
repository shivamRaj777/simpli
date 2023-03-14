// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Task List App!</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('TaskList')}
//       >
//         <Text style={styles.buttonText}>View Tasks</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Login')}
//       >
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Signup')}
//       >
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default HomeScreen;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ProfileScreen from './ProfileScreen';
import TaskListScreen from './TaskListScreen';

const HomeScreen = ({navigation}) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if auth token exists in AsyncStorage
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, []);

  if (token) {
    // If auth token exists, redirect to profile screen
    return <TaskListScreen token={token} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to our app!</Text>
      <Text style={styles.message}>Please login or signup to use our service.</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View>
        <Text>    </Text>
        <Text>    </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});

export default HomeScreen;
