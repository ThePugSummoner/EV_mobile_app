import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { HomeStyle } from '../style/style';

export default function Registration ({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [pin, setPin] = useState('');
  const [repeatPin, setRepeatPin] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    
    navigation.navigate('Main Page');

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
        onChangeText={setName}
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Email"
        placeholderTextColor="#cbb26a"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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
