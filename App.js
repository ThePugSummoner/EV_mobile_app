import Profile from './components/Profile';
import Mainpage from './components/MainPage';
import Chargingstations from './components/ChargingStations';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
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
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Main Page" component={Mainpage} />
        <Tab.Screen name="Charging Stations" component={Chargingstations} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}