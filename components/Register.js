import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { signUp } from "./Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
import { HomeStyle } from '../style/style';

export default function Register ({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [pin, setPin] = useState('');
  const [repeatPin, setRepeatPin] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if(!name) {
      Alert.alert('Name is required!')
    }
    else if (!email) {
        Alert.alert('Email is required!')
    }
    else if (!phone) {
      Alert.alert('Phonenumber is required!')
    }
    else if (!password) {
        Alert.alert('Password is required!')
    }
    else if (!repeatPassword) {
        setPassword('')
        Alert.alert('Confirm password is required!')
    }
    else if (password !== repeatPassword) {
        Alert.alert('Password do not match!')
    }
    else if (!pin) {
      Alert.alert('PIN is required!')
    }
    else if (!repeatPin) {
      setPassword('')
      Alert.alert('Confirm PIN is required!')
    }
    else if (pin !== repeatPin) {
      Alert.alert('PIN do not match!')
    }
    else {
        signUp(name, email, password, phone, pin) 
            onAuthStateChanged(auth, (user) => {
                if(user) {
                  navigation.navigate('Main Page', {userUid: user.uid})
                }
            })
    }

  };

  

  return (
    <ScrollView contentContainerStyle={HomeStyle.container}>
    <View style={HomeStyle.container}>
      <Text style={{ color: '#E5D9B6', marginBottom: 10 }}>Registration</Text>
      
      <TextInput
        style={HomeStyle.input}
        placeholder="Name"
        placeholderTextColor="#cbb26a"
        value={name}
        onChangeText={(name) => setName(name.trim())}
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Email"
        placeholderTextColor="#cbb26a"
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        keyboardType="email-address"
        autoCapitalize='none'
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Phone"
        placeholderTextColor="#cbb26a"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Password"
        placeholderTextColor="#cbb26a"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Repeat Password"
        placeholderTextColor="#cbb26a"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="PIN"
        placeholderTextColor="#cbb26a"
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4}
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Repeat PIN"
        placeholderTextColor="#cbb26a"
        value={repeatPin}
        onChangeText={setRepeatPin}
        keyboardType="numeric"
        maxLength={4}
      />

      <Text style={{ color: 'red' }}>{error}</Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#cbb26a',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={handleRegister}
      >
        <Text style={{ fontSize: 20, color: '#1D1A39' }}>Register</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}
