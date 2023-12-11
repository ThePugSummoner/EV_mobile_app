import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native';
import { signUp } from "./Auth";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "../firebase/Config";
import { HomeStyle } from '../style/style';
import { Picker } from '@react-native-picker/picker';


const carOptions = [
  { label: 'Flash EV', value: 'Flash EV', drive: 'rear', totalPower: 150, torque: 250, range: 374, capacity: 64, chargePower: 6.6, consumption: 17.1, capacityLeft: 40},
  { label: 'Lightning EV', value: 'Lightning EV', drive: 'dual motor AWD', totalPower: 340, torque: 510, range: 400, capacity: 75, chargePower: 11, consumption: 18.7, capacityLeft: 20},
  { label: 'Bolt EV', value: 'Bolt EV', drive: 'rear',  totalPower: 250, torque: 320, range: 384, capacity: 70, chargePower: 11, consumption: 18.2, capacityLeft: 60},

];

export default function Register ({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [selectedCar, setSelectedCar] = useState({});

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Back to Home Screen', 'Are you sure you want to navigate back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigateToLogin()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const navigateToLogin = () => {
    navigation.navigate('Home'); 
  };



  const handleRegister = async () => {
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
    else {
        try {
          const registrationSuccess = await signUp(name, email, password, phone, selectedCar);
          if (registrationSuccess) {
              const user = getAuth().currentUser;
              navigation.navigate('Main Page', { userUid: user.uid });
          } else {
              console.error('Registration failed!');
          }
        } catch (error) {      
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Registration failed. Email is already in use.');
          } else {
            console.error('Error during registration: ', error.message);
          }
        }
    }

  };

  return (
    <ScrollView contentContainerStyle={HomeStyle.container}>
    <View style={HomeStyle.containerRegister}>
      <Text style={HomeStyle.header}>REGISTRATION</Text>
      
      <TextInput
        style={HomeStyle.input}
        placeholder="Name*"
        
        value={name}
        onChangeText={(name) => setName(name.trim())}
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Email*"
        
        value={email}
        onChangeText={(email) => setEmail(email.trim())}
        keyboardType="email-address"
        autoCapitalize='none'
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Phone*"
        
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Password*"
       
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={HomeStyle.input}
        placeholder="Repeat Password*"
        
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
      />
      <View style={[HomeStyle.input, {padding: 0, backgroundColor: '#E5D9B6'}]}> 
        <Picker
          selectedValue={selectedCar}
          onValueChange={(itemValue) => setSelectedCar(itemValue)}
          style={[HomeStyle.input, {padding: 0, color: '#1D1A39', backgroundColor: '#E5D9B6', width: 200, margin: 0}]}
          dropdownIconColor={'#cbb26a'}
        >
          <Picker.Item label="Select a car" value="" style={{color: '#1D1A39', fontSize: 18, backgroundColor: '#E5D9B6', padding: 0, margin: 5}}/>
          {carOptions.map((car, index) => (
            <Picker.Item key={index} label={car.label} value={car} style={{color: '#1D1A39', fontSize: 18, backgroundColor: '#E5D9B6'}}/>
          ))}
        </Picker>
      </View>
      <TouchableOpacity
        style={[HomeStyle.loginButton]}
        onPress={handleRegister}
      >
        <Text style={HomeStyle.loginButtonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}
