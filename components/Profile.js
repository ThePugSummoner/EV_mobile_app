import { Image, Text, TouchableOpacity, View, BackHandler, Alert } from 'react-native';
import styles, { ProfileStyle } from '../style/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { logOut } from './Auth';
import { getUserData } from './Auth';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';


export default Profile = ({ route, navigation }) => {

  const user = getAuth().currentUser
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);
        
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

    const handleLogout = () => {

        /* logOut() */
        Alert.alert('Log out:', 'Are you sure you want to log out?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => [logOut(), navigation.navigate('Home')]},
        ]);
        return true;
        
    }

    useEffect(() => {
      const backAction = () => {
        Alert.alert('Log out:', 'Are you sure you want to log out?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => [logOut(), navigation.navigate('Home')]},
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove();
    }, []);



    return (
        <View style={ProfileStyle.container}>
            {/*<View style={ProfileStyle.profile}>
              <Text style={ProfileStyle.profileText}>My profile</Text>
            </View> */}
            <View style={ProfileStyle.avatar}>
                <MaterialCommunityIcons name="account-box" size={110} color="khaki" />
                {userData && (
                    <>
                    <Text style={ProfileStyle.avatarText}>Welcome, {userData.name}</Text>
                    <Text style={ProfileStyle.avatarText}>Your car is: {userData.car.value}</Text>
                    </>
                    
                )}
                
            </View>
            <View style={{ flex: 4 }}>
                <TouchableOpacity
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate("Profile Info")}
                >
                    <View style={ProfileStyle.icon}>
                      <MaterialCommunityIcons name="account" size={35} color="khaki" />
                    </View>
                    <Text style={ProfileStyle.buttonText}>Profile info</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate('Car Info', { userUid: user.uid })}
                >
                    <View style={ProfileStyle.icon}>
                      <MaterialCommunityIcons name="car-sports" size={35} color="khaki" />
                    </View>
                    <Text style={ProfileStyle.buttonText}>Technical Specs</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate("Charging Menu")}
                >
                    <View style={ProfileStyle.icon}>
                      <MaterialCommunityIcons name="lightning-bolt" size={35} color="khaki" />
                    </View>
                    <Text style={ProfileStyle.buttonText}>Charging menu</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={ProfileStyle.button} 
                onPress={handleLogout}
                >
                    <View style={ProfileStyle.icon}>
                      <MaterialCommunityIcons name="logout" size={35} color="khaki" />
                    </View>
                    <Text style={ProfileStyle.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}