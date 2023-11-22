import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { HomeStyle, MainPageStyle, ProfileStyle } from '../style/style';
//import BatteryGauge from 'react-battery-gauge';
import Toggle from "react-native-toggle-element";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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

    /* const handleLogout = () => {
     
        logOut()
        navigation.navigate("Login")
    } */

    let componentToShow;

    // Check if userData and userData.car exist before accessing their properties
    if (userData && userData.car) {
        switch (userData.car.value) {
        case 'Flash EV':
            componentToShow = (
            <Image
                source={require('../images/CarTransparent.png')}
                style={{ width: 330, height: 230, resizeMode: 'contain' }}
            />
            );
            break;
        case 'Lightning EV':
            componentToShow = (
            <Image
                source={require('../images/CarEV.png')}
                style={{ width: 330, height: 230, resizeMode: 'contain' }}
            />
            );
            break;
        case 'Bolt EV':
            componentToShow = <Image
            source={require('../images/VOlterraBoltEV2.png')}
            style={{ width: 330, height: 230, resizeMode: 'contain' }}
            />
            break;
        default:
            componentToShow = null;
        }
    } else {
        // Handle the case where userData or userData.car is null or undefined
        componentToShow = null;
    }
    
    return (
        <View style={MainPageStyle.container}>
          {userData && (
            <View style={[MainPageStyle.header, {paddingTop: 50}]}>
              <Text style={MainPageStyle.standInText}>Welcome, {userData.name}!</Text>
              <Text style={MainPageStyle.standInText}>{userData.car.value}</Text>
            
            </View> )}
            <View style={MainPageStyle.carImage}>
                {/* <Image source={require('../images/CarTransparent.png')} 
                    style={{width: 330, height: 230, resizeMode: 'contain'}}
                /> */}
                {componentToShow}
            </View>
            <View style={[MainPageStyle.battery, {marginBottom: 0}]}>
                {/*<BatteryGauge
                value={40} 
                maxValue={100}
                orientation= 'vertical'
                size={200}
                animated= 'false'
                charging= 'false'
                style={MainPageStyle.batteryGauge}                
                /> */}
                <Text style={MainPageStyle.standInText}>BATTERY</Text>
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
                        width: 50, 
                        height: 50, 
                        radius: 25, 
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
                        width: 50, 
                        height: 50, 
                        radius: 25, 
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
                        width: 50, 
                        height: 50, 
                        radius: 25, 
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