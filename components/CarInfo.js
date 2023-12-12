import { Text, View, Image } from "react-native"
import { getUserData } from "./Auth";
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { HomeStyle, MainPageStyle } from '../style/style';

function CarInfo(){

    const user = getAuth().currentUser
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const user = await getUserData();
            setUserData(user);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
        };

        fetchUserData();
    }, []);

    const CarInfoTable = ({ userData }) => {
        const tableData = [
          ['Model', `Volterra ${userData.car.value}`],
          ['Drive', userData.car.drive],
          ['Total power', `${userData.car.totalPower} kW`],
          ['Torque', `${userData.car.torque} Nm`],
          ['Range', `${userData.car.range} km`],
          ['Battery capacity', `${userData.car.capacity} kWh`],
          ['Charging power', `${userData.car.chargePower} kW`],
          ['Consumption', `${userData.car.consumption} kW/100km`],
        ];

        return (
            <View style={{ borderWidth: 1, borderColor: '#E5D9B6', padding: 10, width: 300, marginBottom: 20 }}>
              {tableData.map((rowData, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={[HomeStyle.text, {fontSize: 18}]}>{rowData[0]}</Text>
                  <Text style={[HomeStyle.text, {fontSize: 18}]}>{rowData[1]}</Text>
                </View>
              ))}
            </View>
          );
        };

        let componentToShow;

        if (userData && userData.car) {
            switch (userData.car.value) {
            case 'Flash EV':
                componentToShow = (
                <Image
                    source={require('../images/CarTransparent.png')}
                    style={{ width: 330, height: 230, resizeMode: 'contain' }}
                />
                );
                break;
            case 'Lightning EV':
                componentToShow = (
                <Image
                    source={require('../images/CarEV.png')}
                    style={{ width: 330, height: 330, resizeMode: 'contain' }}
                />
                );
                break;
            case 'Bolt EV':
                componentToShow = <Image
                source={require('../images/VOlterraBoltEV2.png')}
                style={{ width: 430, height: 330, resizeMode: 'contain' }}
                />
                break;
            default:
                componentToShow = null;
            }
        } else {
            componentToShow = null;
        }

    return(
        <View style={HomeStyle.container}>
            <View style={MainPageStyle.carImage}>
                {componentToShow}
            </View>
            {userData && <CarInfoTable userData={userData}/>}
        </View>
        
    )
}
export default CarInfo