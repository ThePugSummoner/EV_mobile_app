import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from './MainPage';
import CustomStackNavigator from './CustomStackNavigator';
import ChargingStations from './ChargingStations';
import ElectricPrice from './ElectricPrice';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




const MainStack = createBottomTabNavigator();

const MainNavigator = () => (
  <MainStack.Navigator sceneContainerStyle={{backgroundColor: 'transparent'}}
    screenOptions={({ route }) => ({ 
        tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Profile') {
            
            iconName = focused
            ? 'account'
            : 'account-outline'
        }
        else if (route.name === 'My Car') {
            
            iconName = focused
            ? 'car-sports'
            : 'car-sports'
        }
        else if (route.name === 'Charging Stations') {
            
            iconName = focused
            ? 'lightning-bolt'
            : 'lightning-bolt-outline'
        }
        else if (route.name === 'Electricity Price') {
            //tälle oma iconi, testissä €
            iconName = focused
            ? 'currency-eur'
            : 'currency-eur'
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
        
        },
        tabBarStyle: { backgroundColor: '#fff3be' }, // #22203a, #fff3be
        tabBarActiveTintColor: 'midnightblue', // midnightblue, khaki
        tabBarInactiveTintColor: 'darkgoldenrod' // darkgoldenrod, lightyellow
    })}>
    <MainStack.Screen name="My Car" component={MainPage} initialParams={{ userUid: null }} options={{headerShown: false }}/>
    <MainStack.Screen name="Profile" component={CustomStackNavigator}  options={{headerShown: false }}/>
    <MainStack.Screen name="Charging Stations" component={ChargingStations}/>
    <MainStack.Screen name="Electricity Price" component={ElectricPrice}  />
  </MainStack.Navigator>
);

export default MainNavigator