import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles, { ProfileStyle } from '../style/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { logOut } from './Auth';
import { getUserData } from './Auth';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';


export default Profile = ({ route, navigation }) => {

    /* const user = getAuth().currentUser
    console.log(user) */
    /* const [userData, setUserData] = useState(null); */

  /* useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData(); // Assuming getUserData returns a Promise
        setUserData(user);
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle the error as needed
      }
    };

    fetchUserData();
  }, []);

    const handleLogout = () => {
        logOut()
        navigation.navigate('Home')
      } */

    return (
        <View style={ProfileStyle.container}>
            <View style={ProfileStyle.avatar}>
                <MaterialCommunityIcons name="account-box" size={100} color="black" />
                {/* {userData && (
                    <>
                    <Text style={ProfileStyle.avatarText}>Welcome, {userData.name}</Text>
                    <Text style={ProfileStyle.avatarText}>Your car is: {userData.car.value}</Text>
                    </>
                    
                )} */}
                
            </View>
            <View style={{ flex: 4 }}>
                <TouchableOpacity
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate("Profile Info")}
                >
                    <MaterialCommunityIcons name="account" size={35} color="black" />
                    <Text style={ProfileStyle.buttonText}>Profile info</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate("Car Info")}
                >
                    <MaterialCommunityIcons name="car-sports" size={35} color="black" />
                    <Text style={ProfileStyle.buttonText}>Car info</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate("Charging Menu")}
                >
                    <MaterialCommunityIcons name="lightning-bolt" size={35} color="black" />
                    <Text style={ProfileStyle.buttonText}>Charging menu</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={ProfileStyle.button} onPress={handleLogout}>
                    <MaterialCommunityIcons name="logout" size={35} color="black" />
                    <Text style={ProfileStyle.buttonText}>Log Out</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}