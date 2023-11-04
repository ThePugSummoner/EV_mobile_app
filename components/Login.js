import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { HomeStyle } from '../style/style';

export default function Login ({ navigation }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handlePinChange = (text) => {
    if (/^\d+$/.test(text) && text.length <= 4) {
      setPin(text);
      setError('');
    } else {
      setError('Please enter a 4-digit PIN');
    }
  };

  /* const handleLogin = () => {
    if (pin.length === 4) {
      // PIN is valid, perform login action
      navigation.navigate('LoggedInScreen'); // Replace with actual screen name
    } else {
      setError('Please enter a 4-digit PIN');
    }
  }; */

  return (
    <View style={HomeStyle.container}>
    <View style={HomeStyle.containerLogin}>
      <Text style={{ color: '#1D1A39', marginBottom: 10, fontWeight: 'bold', fontSize: 15 }}>Enter your PIN</Text>
      <TextInput
        style={HomeStyle.textInput}
        secureTextEntry
        keyboardType="numeric"
        maxLength={4}
        value={pin}
        onChangeText={handlePinChange}
      />
      <Text style={{ color: 'red' }}>{error}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#cbb26a',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
        }}
        /* onPress={handleLogin} */
        onPress={() => navigation.navigate('Main Page')}
      >
        <Text style={{ fontSize: 20, color: '#1D1A39' }}>LOGIN</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
