import Profile from './components/Profile';
import Mainpage from './components/MainPage';
import Home from './components/Home';
import Chargingstations from './components/ChargingStations';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Registration from './components/Registration';
import Login from './components/Login';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
/* const Stack = createNativeStackNavigator(); */

export default function App() {
  
  const [showTabs, setShowTabs] = useState(true)

  return (
    <NavigationContainer>
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
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />
          
          },
          tabBarStyle: { backgroundColor: '#1D1A39' },
          tabBarActiveTintColor: 'khaki',
          tabBarInactiveTintColor: 'lightyellow'
        })}
      > 
      {showTabs && (
        <>
          <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: 'none'}}}/>
          <Tab.Screen name="Registration" component={Registration} options={{tabBarStyle: {display: 'none'}}}/>
          <Tab.Screen name="Login" component={Login} options={{tabBarStyle: {display: 'none'}}}/>
        </>
        )}
        <Tab.Screen name="Profile" component={Profile}  listeners={{
            focus: () => {
              setShowTabs(false); 
            },
            
          }}/>
        <Tab.Screen name="Main Page" component={Mainpage}  listeners={{
            focus: () => {
              setShowTabs(false); 
            }
          }}/>
        <Tab.Screen name="Charging Stations" component={Chargingstations}  listeners={{
            focus: () => {
              setShowTabs(false); 
            },
           
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}