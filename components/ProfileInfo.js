import { Text, View } from "react-native"
import { getUserData } from './Auth';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import styles, { HomeStyle } from '../style/style';



function ProfileInfo(){

    const user = getAuth().currentUser
    console.log(user)
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const user = await getUserData();
            setUserData(user);
            console.log(userData)
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
        };

        fetchUserData();
    }, []);

    return(
        <View style={HomeStyle.container}>
            {userData && (
                    <>
                    <Text style={HomeStyle.text}>User name: {userData.name}</Text>
                    <Text style={HomeStyle.text}>Email address: {userData.email}</Text>
                    <Text style={HomeStyle.text}>Phone number: {userData.phone}</Text>
                    <Text style={HomeStyle.text}>Your car model: Volterra {userData.car.value}</Text>
                    </>
                    
                )}
        </View>
        
    )
}
export default ProfileInfo