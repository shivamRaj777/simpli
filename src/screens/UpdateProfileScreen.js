// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const UpdateProfileScreen = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     // Fetch user data from async storage
//     const fetchData = async () => {
//       try {
//         const auth_token = await AsyncStorage.getItem('auth_token');
//         const response = await fetch('https://task-manager-production-872a.up.railway.app/users/me', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${auth_token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();
//         setName(data.name);
//         setEmail(data.email);
//       } catch (err) {
//         setErrorMessage('Unable to fetch user data. Please try again later.');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleUpdateProfile = async () => {
//     try {
//       const auth_token = await AsyncStorage.getItem('token');
//       const response = await fetch('https://task-manager-production-872a.up.railway.app/users/me', {
//         method: 'PATCH',
//         headers: {
//           Authorization: `Bearer ${auth_token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         navigation.navigate('Profile');
//       } else {
//         setErrorMessage(data.message);
//       }
//     } catch (err) {
//       setErrorMessage('Unable to update profile. Please try again later.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Update Profile</Text>
//       {errorMessage ? (
//         <Text style={styles.error}>{errorMessage}</Text>
//       ) : null}
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password (optional)"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Update Profile" onPress={handleUpdateProfile} />
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

// export default UpdateProfileScreen;

// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const UpdateProfileScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [age, setAge] = useState('');

//   const handleUpdateProfile = async () => {
//     const token = await AsyncStorage.getItem('token');
//     const response = await fetch('https://task-manager-production-872a.up.railway.app/users/me', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({ name, email, password, age }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       Alert.alert('Error', errorData.error);
//       return;
//     }

//     const updatedUser = await response.json();
//     Alert.alert('Success', 'Profile updated successfully!');
//     setName(updatedUser.name);
//     setEmail(updatedUser.email);
//     setPassword(updatedUser.password);
//     setAge(updatedUser.age);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Age"
//         value={age}
//         onChangeText={setAge}
//         style={styles.input}
//       />
//       <Button
//         title="Update Profile"
//         onPress={handleUpdateProfile}
//       />
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

// export default UpdateProfileScreen;

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProfileScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://task-manager-production-872a.up.railway.app/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error);
        return;
      }

      const user = await response.json();
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setAge(user.age);
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    const updates = {};

    if (name) {
      updates.name = name;
    }

    if (email) {
      updates.email = email;
    }

    if (password) {
      updates.password = password;
    }

    if (age) {
      updates.age = age;
    }

    const response = await fetch('https://task-manager-production-872a.up.railway.app/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      Alert.alert('Error', errorData.error);
      return;
    }

    const updatedUser = await response.json();
    Alert.alert('Success', 'Profile updated successfully!');
    setName(updatedUser.name);
    setEmail(updatedUser.email);
    setPassword(updatedUser.password);
    setAge(updatedUser.age);
    navigation.navigate('Profile')
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        style={styles.input}
      />
      <Button
        title="Update Profile"
        onPress={handleUpdateProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default UpdateProfileScreen;
