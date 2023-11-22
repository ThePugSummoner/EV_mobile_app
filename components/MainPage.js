import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { HomeStyle, MainPageStyle, ProfileStyle } from '../style/style';
import Toggle from "react-native-toggle-element";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CircularProgression } from './CircularProgress';
import { getUserData, logOut } from './Auth';


export default function MainPage ({ route, navigation }) {

    const [toggleValueLock, setToggleValueLock] = useState(false)
    const [toggleValuePower, setToggleValuePower] = useState(false)
    const [toggleValueAirConditioner, setToggleValueAirConditioner] = useState(false)

    const { userUid } = route.params;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const data = await getUserData(userUid);
        setUserData(data);
        console.log(data)
      };

      fetchData();
    }, [userUid]);

    const handleLogout = () => {
        logOut()
        /* navigation.navigate('Profile') */
    }

    
    return (
        <View style={MainPageStyle.container}>
          {userData && (
            <View style={[MainPageStyle.header, {paddingTop: 50}]}>
              <Text style={MainPageStyle.standInText}>Welcome, {userData.name}!</Text>
              <TouchableOpacity style={ProfileStyle.button} onPress={handleLogout}>
                    <MaterialCommunityIcons name="logout" size={20} color="#b38c1a" />
                    <Text style={ProfileStyle.buttonText}>Log Out</Text>
            </TouchableOpacity>
            </View> )}
            <View style={MainPageStyle.carImage}>
                <Image source={require('../images/CarTransparent.png')} 
                    style={{width: 330, height: 230, resizeMode: 'contain'}}
                />
            </View>
            <View style={[MainPageStyle.battery, {marginBottom: 0}]}>
                {/*<Text style={MainPageStyle.standInText}>BATTERY</Text> */}
                <CircularProgression />
            <Text></Text>
            { userData && (
              <>
                <Text style={{color: '#cbb26a'}}>{userData.car.label}</Text>
                <Text style={{color: '#cbb26a'}}>{userData.car.drive}</Text>
                <Text style={{color: '#cbb26a'}}>{userData.car.totalPower} kW</Text>
                <Text style={{color: '#cbb26a'}}>{userData.car.torque} Nm</Text>
                <Text style={{color: '#cbb26a'}}>{userData.car.range} km</Text>
                <Text style={{color: '#cbb26a'}}>{userData.car.capacity} kWh</Text>
                <Text style={{color: '#cbb26a'}}>{userData.car.chargePower} kW</Text>
                <Text style={{color: '#cbb26a'}}>{userData.car.consumption} kW/100km</Text>

              </>
            )}
            </View>
            <Text></Text>
            <View style={MainPageStyle.toggleButtons}>
                <View style={MainPageStyle.toggleButtonsSingular}>
                    <Toggle 
                    value={toggleValueLock}
                    onPress={() => setToggleValueLock(console.log("Car doors unlocked/locked"))}
                    thumbButton={{ 
                        width: 60, 
                        height: 60, 
                        radius: 30, 
                        activeBackgroundColor: "#b38c1a",
                        inActiveBackgroundColor: "#cbb26a",
                    }}
                    thumbActiveComponent={
                        <MaterialCommunityIcons name='lock' size={30} />
                    }
                    thumbInActiveComponent={
                        <MaterialCommunityIcons name='lock-open-variant-outline' size={30} />
                    }
                    trackBar={{ 
                        activeBackgroundColor: "#cbb26a",
                        inActiveBackgroundColor: "#2c2c2c",
                        borderActiveColor: "#917628",
                        borderInActiveColor: "#cbb26a",
                        borderWidth: 3,
                        width: 85,
                    }}
                    />
                </View>
                <View style={MainPageStyle.toggleButtonsSingular}>
                    <Toggle 
                    value={toggleValuePower}
                    onPress={() => setToggleValuePower(console.log("Car turned on/off"))}
                    thumbButton={{ 
                        width: 60, 
                        height: 60, 
                        radius: 30, 
                        activeBackgroundColor: "#b38c1a",
                        inActiveBackgroundColor: "#cbb26a",
                    }}
                    thumbActiveComponent={
                        <MaterialCommunityIcons name='power' size={30} />
                    }
                    thumbInActiveComponent={
                        <MaterialCommunityIcons name='power-off' size={30} />
                    }
                    trackBar={{ 
                        activeBackgroundColor: "#cbb26a",
                        inActiveBackgroundColor: "#2c2c2c",
                        borderActiveColor: "#917628",
                        borderInActiveColor: "#cbb26a",
                        borderWidth: 3,
                        width: 85,
                    }}
                    />
                </View>
                <View style={MainPageStyle.toggleButtonsSingular}>
                    <Toggle 
                    value={toggleValueAirConditioner}
                    onPress={() => setToggleValueAirConditioner(console.log("Air conditioner is on/off"))}
                    thumbButton={{ 
                        width: 60, 
                        height: 60, 
                        radius: 30, 
                        activeBackgroundColor: "#b38c1a",
                        inActiveBackgroundColor: "#cbb26a",
                    }}
                    thumbActiveComponent={
                        <MaterialCommunityIcons name='air-conditioner' size={30} />
                    }
                    thumbInActiveComponent={
                        <MaterialCommunityIcons name='snowflake' size={30} />
                    }
                    trackBar={{ 
                        activeBackgroundColor: "#cbb26a",
                        inActiveBackgroundColor: "#2c2c2c",
                        borderActiveColor: "#917628",
                        borderInActiveColor: "#cbb26a",
                        borderWidth: 3,
                        width: 85,
                    }}
                    />
                </View>
            </View>
        </View>

    );
}