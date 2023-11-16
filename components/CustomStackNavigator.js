import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import CarInfo from './CarInfo';
import CharginMenu from './ChargingMenu';
import Home from './Home';


const Stack = createNativeStackNavigator()

function CustomStackNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="My Profile" component={Profile} /> 
            <Stack.Screen name="Profile Info" component={ProfileInfo} /> 
            <Stack.Screen name="Car Info" component={CarInfo} /> 
            <Stack.Screen name="Charging Menu" component={CharginMenu} /> 
        </Stack.Navigator>
    )
}

export default CustomStackNavigator