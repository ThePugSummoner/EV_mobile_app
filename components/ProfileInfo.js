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

    const UserInfoTable = ({ userData }) => {
        const tableData = [
          { label: 'User name', value: userData.name },
          { label: 'Email', value: userData.email },
          { label: 'Phone', value: userData.phone },
          { label: 'Car', value: `Volterra ${userData.car.value}` },
        ];
      
        return (
          <View style={{ padding: 10 }}>
            {tableData.map((rowData, index) => (
              <View key={index} style={{ borderBottomWidth: 1, borderColor: '#E5D9B6', paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[HomeStyle.text, {marginRight: 50}]}>{rowData.label}</Text>
                <Text style={[HomeStyle.text]}>{rowData.value}</Text>
              </View>
            ))}
          </View>
        );
      };

    return(
        <View style={HomeStyle.container}>
            {userData && /* (
                    <>
                    <Text style={HomeStyle.text}>User name: {userData.name}</Text>
                    <Text style={HomeStyle.text}>Email address: {userData.email}</Text>
                    <Text style={HomeStyle.text}>Phone number: {userData.phone}</Text>
                    <Text style={HomeStyle.text}>Your car model: Volterra {userData.car.value}</Text>
                    </>
                    
                ) */ <UserInfoTable userData={userData} />}
        </View>
        
    )
}
export default ProfileInfo