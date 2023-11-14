import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import styles from '../style/style';
import { getUserData } from './Auth';

export default MainPage = ({ route }) => {
    const { userUid } = route.params;
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
          const data = await getUserData(userUid);
          setUserData(data);
          console.log(data.name)
        };
    
        fetchData();
      }, [userUid]);
    
    return (
        <View>
         {userData && (
          <>
            <Text>Welcome, {userData.name}!</Text>
            <Text>Your Car:</Text>
            <Text key={userData.car.value}>{userData.car.label}</Text>
            <Text>{userData.car.drive}</Text>
            
          </>
        )} 
      </View>
    );
}