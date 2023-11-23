import Profile from './components/Profile';
import Mainpage from './components/MainPage';
import Home from './components/Home';
import Chargingstations from './components/ChargingStations';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Register from './components/Register';
import Login from './components/Login';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CustomStackNavigator from './components/CustomStackNavigator';
import ElectricPrice from './components/ElectricPrice';
import { setTopLevelNavigator } from './components/Auth';


const Tab = createBottomTabNavigator();

export default function App() {
  
 
  const [showTabs, setShowTabs] = useState(true)
  
  return (
    <NavigationContainer ref={setTopLevelNavigator}>
      <Tab.Navigator
        //initialRouteName="Feed"
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={({ route }) => ({ 
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Profile') {
              
              iconName = focused
              ? 'account'
              : 'account-outline'
            }
            else if (route.name === 'Main Page') {
              
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
        })}
      >
      {showTabs && (
        <>
          <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: 'none'}, headerShown: false}}/>
          <Tab.Screen name="Register" component={Register} options={{tabBarStyle: {display: 'none'}, headerShown: false}}/>
          <Tab.Screen name="Login" component={Login} options={{tabBarStyle: {display: 'none'}, headerShown: false}}/>
        </>
      )}
        <Tab.Screen name="Profile" component={CustomStackNavigator}  listeners={{
            focus: () => {
              setShowTabs(true); 
            },
          }}
          options={{tabBarStyle: {display: 'none'}, headerShown: false }}
          
          />
        <Tab.Screen name="Main Page" component={Mainpage} options={{headerShown:false}} listeners={{
            focus: () => {
              setShowTabs(false); 
            },
          }}/>
        <Tab.Screen name="Charging Stations" component={Chargingstations}  listeners={{
            focus: () => {
              setShowTabs(false); 
            },
           
          }}/>
        <Tab.Screen name="Electricity Price" component={ElectricPrice}  listeners={{
            focus: () => {
              setShowTabs(false); 
            },
           
          }}/>
      </Tab.Navigator>
    </NavigationContainer>

  );
}