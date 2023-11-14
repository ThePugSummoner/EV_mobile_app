import React, { useState, useEffect } from 'react';
import { Text, View, Image, } from 'react-native';
import { MainPageStyle } from '../style/style';
import BatteryGauge from 'react-battery-gauge';
import Toggle from "react-native-toggle-element";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function MainPage ({ navigation }) {

    const [toggleValueLock, setToggleValueLock] = useState(false)
    const [toggleValuePower, setToggleValuePower] = useState(false)
    const [toggleValueAirConditioner, setToggleValueAirConditioner] = useState(false)
    
    return (
        <View style={MainPageStyle.container}>
            <View style={MainPageStyle.header}>
                <Text style={MainPageStyle.standInText}>KÄYTTÄJÄN TIEDOT</Text>
                <Text style={MainPageStyle.standInText}>AUTON NIMI</Text>
            </View>
            <View style={MainPageStyle.carImage}>
                <Image source={require('../images/CarTransparent.png')} 
                    style={{width: 330, height: 230, resizeMode: 'contain'}}
                />
            </View>
            <View style={MainPageStyle.battery}>
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
            </View>
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