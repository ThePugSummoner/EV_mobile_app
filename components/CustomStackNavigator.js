import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import CarInfo from './CarInfo';
import ChargingMenu from './ChargingMenu';
import Home from './Home';
import MainPage from './MainPage';


const Stack = createNativeStackNavigator()

function CustomStackNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="My Profile" component={Profile} /> 
            <Stack.Screen name="Profile Info" component={ProfileInfo} /> 
            <Stack.Screen name="Car Info" component={CarInfo} /> 
            <Stack.Screen name="Charging Menu" component={ChargingMenu} />
            <Stack.Screen name="Main Page" component={MainPage} options={{headerShown:false, tabBarStyle: {display: 'none'}}}/>
        </Stack.Navigator>
    )
}

export default CustomStackNavigator