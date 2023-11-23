import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { HomeStyle } from '../style/style';
import { signIn } from "./Auth";
import { database } from 'firebase/database';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '../firebase/Config';

export default function Login ({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        
      if (!email) {
        Alert.alert('Email is required!')
      }
      else if (!password) {
        Alert.alert('Password is required!')
      }
      else {
        /* await signIn(email, password) */
          try {
            const loginSuccess = await signIn(email, password);
            if (loginSuccess) {
              const user = getAuth().currentUser;
              navigation.navigate('Main Page', { userUid: user.uid });
            } else {
              Alert.alert('Login failed!');
              setEmail('')
              setPassword('')
            }
          } catch (error) {
            console.error('Error during login: ', error.message);
            /* Alert.alert('Error during login: ', error.message); */
          }
        }
      }

  return (
    <View style={HomeStyle.container}>
    <View style={HomeStyle.containerLogin}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Login</Text>
      <TextInput
        style={HomeStyle.textInput}
        placeholder="Enter your email*"
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={HomeStyle.textInput}
        placeholder="Enter your password*"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#cbb26a',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          margin: 10
        }}
        onPress={handleLogin}
      >
        <Text style={{ fontSize: 20, color: '#1D1A39', fontWeight: 'bold' }}>LOGIN</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
