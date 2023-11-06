import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles, { ProfileStyle } from '../style/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default Profile = ({ navigation }) => {
    return (
        <View style={ProfileStyle.container}>
            <View style={ProfileStyle.avatar}>
                <MaterialCommunityIcons name="account-box" size={100} color="black" />
                <Text style={ProfileStyle.avatarText}>Name: nönönönön</Text>
                <Text style={ProfileStyle.avatarText}>Car:nnunununun</Text>
            </View>
            <View style={{ flex: 4 }}>
                <TouchableOpacity
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate("Profile Info")}
                >
                    <MaterialCommunityIcons name="cookie-settings" size={35} color="black" />
                    <Text style={ProfileStyle.buttonText}>Profile info</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate("Car Info")}
                >
                    <MaterialCommunityIcons name="cookie-settings" size={35} color="black" />
                    <Text style={ProfileStyle.buttonText}>Car info</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={ProfileStyle.button}
                onPress={()=>navigation.navigate("Charging Menu")}
                >
                    <MaterialCommunityIcons name="cookie-settings" size={35} color="black" />
                    <Text style={ProfileStyle.buttonText}>Charging menu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ProfileStyle.button}>
                    <MaterialCommunityIcons name="cookie-settings" size={35} color="black" />
                    <Text style={ProfileStyle.buttonText}>Clear userinfo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}