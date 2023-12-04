import React, { useState, useEffect, usePrevious } from 'react';
import { Text, View, Image, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { HomeStyle, MainPageStyle, ProfileStyle } from '../style/style';
import Toggle from "react-native-toggle-element";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CircularProgression } from './CircularProgress';
import { getUserData, logOut } from './Auth';


export default function MainPage ({ route, navigation }) {

    const [toggleValueLock, setToggleValueLock] = useState(true)
    const [lockText, setLockText] = useState("Locked")

    const [toggleValuePower, setToggleValuePower] = useState(false)
    const [powerText, setPowerText] = useState("Power off")

    const [toggleValueAirConditioner, setToggleValueAirConditioner] = useState(false)
    const [airConditionerText, setAirConditionerText] = useState("AC off")

    const { userUid } = route.params;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const data = await getUserData(userUid);
        setUserData(data);
      };

      fetchData();
    }, [userUid]);

    useEffect(() => {
        const backAction = () => {
          Alert.alert('Hold on!', 'Are you sure you want to log out?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => handleLogout()},
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);

      const handleLogout = () => {
        logOut()
        navigation.navigate('Home')
      }



    function changeLockValue() {
        if (toggleValueLock === true) {
            setToggleValueLock(false)
            setLockText("Unlocked")
            console.log("Lock is false")
        }
        else if (toggleValueLock === false) {
            setToggleValueLock(true)
            setLockText("Locked")
            console.log("Lock is true")
        }
    }

    function changePowerValue() {
        if (toggleValuePower === true) {
            setToggleValuePower(false)
            setPowerText("Power off")
            console.log("Power is false")
        }
        else if (toggleValuePower === false) {
            setToggleValuePower(true)
            setPowerText("Power on")
            console.log("Power is true")
        }
    }

    function changeAirConditionerValue() {
        if (toggleValueAirConditioner === true) {
            setToggleValueAirConditioner(false)
            setAirConditionerText("AC off")
            console.log("AC is false")
        }
        else if (toggleValueAirConditioner === false) {
            setToggleValueAirConditioner(true)
            setAirConditionerText("AC on")
            console.log("AC is true")
        }
    }

    let componentToShow;

    if (userData && userData.car) {
        switch (userData.car.value) {
        case 'Flash EV':
            componentToShow = (
            <Image
                source={require('../images/CarTransparent.png')}
                style={{ width: 330, height: 230, resizeMode: 'contain'}}
            />
            );
            break;
        case 'Lightning EV':
            componentToShow = (
            <Image
                source={require('../images/CarEV.png')}
                style={{ width: 330, height: 230, resizeMode: 'contain'}}
            />
            );
            break;
        case 'Bolt EV':
            componentToShow = <Image
            source={require('../images/VOlterraBoltEV2.png')}
            style={{ width: 330, height: 230, resizeMode: 'contain'}}
            />
            break;
        default:
            componentToShow = null;
        }
    } else {
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
                {componentToShow}
                <MaterialCommunityIcons name={toggleValueLock ? 'lock' : 'lock-open-variant'} size={40} style={{position: 'absolute', top: 90, color: toggleValueLock ? 'red' : 'green', backgroundColor: '#e9c46a', borderRadius: 30, padding: 8}}/>
            </View>
            
            <View style={[MainPageStyle.battery, {marginBottom: 0}]}>
                {/*<Text style={MainPageStyle.standInText}>BATTERY</Text> */}
                <CircularProgression />
            </View>
            <View style={MainPageStyle.toggleButtons}>
                <View style={MainPageStyle.toggleButtonsSingular}>
                    <Toggle 
                    value={toggleValueLock}
                    onPress={() => changeLockValue()}
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
                    <Text style={MainPageStyle.lockTextStyle}>{lockText}</Text>
                </View>
                <View style={MainPageStyle.toggleButtonsSingular}>
                    <Toggle 
                    value={toggleValuePower}
                    onPress={() => changePowerValue()}
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
                    <Text style={MainPageStyle.powerTextStyle}>{powerText}</Text>
                </View>
                <View style={MainPageStyle.toggleButtonsSingular}>
                    <Toggle 
                    value={toggleValueAirConditioner}
                    onPress={() => changeAirConditionerValue()}
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
                    <Text style={MainPageStyle.acTextStyle}>{airConditionerText}</Text>
                </View>
            </View>
            {/*<View style={MainPageStyle.buttonTexts}>
                <View>
                    <Text style={MainPageStyle.lockTextStyle}>{lockText}</Text>
                </View>
                <View>
                    <Text style={MainPageStyle.powerTextStyle}>{powerText}</Text>
                </View>
                <View>
                    <Text style={MainPageStyle.acTextStyle}>{airConditionerText}</Text>
                </View>
                </View> */}
        </View>

    );
}