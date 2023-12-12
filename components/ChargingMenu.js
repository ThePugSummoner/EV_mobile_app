
import { Text, View, Image, TouchableOpacity } from "react-native"
import { getUserData } from "./Auth";
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {ChargingMenuStyle, MainPageStyle} from '../style/style';
import { CircularProgression } from './CircularProgress';
import { db, PRICES_REF } from '../firebase/Config';
import { child, push, ref, remove, update, onValue, set, get } from '@firebase/database';



function ChargingMenu(){

    const user = getAuth().currentUser
    const [userData, setUserData] = useState(null);
    const [formattedChargingFinishTime, setFormattedChargingFinishTime] = useState('--:--');
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const [formattedChargingFinishDate, setFormattedChargingFinishDate] = useState('')
    const [chargingStatus, setChargingStatus] = useState(false)
    const [allPrices, setAllPrices] = useState();
    const [isLoading, setIsLoading] = useState(true)

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

    useEffect(() => {
        const fetchData = async () => {
            try {
            const dbRef = ref(db, PRICES_REF);
            const snapshot = await get(dbRef);
    
            if (snapshot.exists()) {
                const data = snapshot.val();
                const dataArray = Object.values(data);
    
                dataArray.flat().sort((a, b) => {
                    const dateA = new Date(`${a.startDate} ${a.startTime}`);
                    const dateB = new Date(`${b.startDate} ${b.startTime}`);
                    return dateA - dateB;
                });
    
                setAllPrices(dataArray);
                setIsLoading(false);
                console.log('Fetching data from Firebase successful!');
                console.log(allPrices)
            } else if (isLoading) {
                fetchPrices();
            }
            } catch (error) {
            console.error('Error fetching data from Firebase:', error.message);
            }
        };
    
        fetchData();
    }, [isLoading]);

    
    let capacityLeft
    let chargingTime
    
    if (userData && userData.car) {
        capacityLeft = parseFloat(userData.car.capacity / 100 * userData.car.capacityLeft).toFixed(1)
        chargingTime = (parseFloat((userData.car.capacity - capacityLeft) / userData.car.chargePower * 60).toFixed(2)) 
    }

    const ChargingTimeCalculation = () => {
        setChargingStatus((prevChargingStatus) => !prevChargingStatus)
        if (chargingStatus === false ) {
            const chargingFinishTime = new Date(currentDateTime.getTime() + chargingTime * 60000);
            /* const hours = chargingFinishTime.getHours();
            const minutes = chargingFinishTime.getMinutes();

            const formattedChargingFinishTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; */
            const formattedChargingFinishTime = `${chargingFinishTime.getHours()}:${chargingFinishTime.getMinutes() < 10 ? '0' : ''}${chargingFinishTime.getMinutes()}`
            setFormattedChargingFinishTime(formattedChargingFinishTime)
            
            const hours = chargingFinishTime.getHours().toString().padStart(2, '0');
            const minutes = chargingFinishTime.getMinutes().toString().padStart(2, '0');
            const year = chargingFinishTime.getFullYear();
            const month = (chargingFinishTime.getMonth() + 1).toString().padStart(2, '0');
            const day = chargingFinishTime.getDate().toString().padStart(2, '0');

            const formattedChargingFinishDate = `${hours}:${minutes} ${year}-${month}-${day}`;
            setFormattedChargingFinishDate(formattedChargingFinishDate)
        }
        else {
            setFormattedChargingFinishTime('--:--')
        }
        
    }

    const ChargingPriceCalculation = () => {


        const hours = currentDateTime.getHours().toString().padStart(2, '0');
        const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
        const year = currentDateTime.getFullYear();
        const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDateTime.getDate().toString().padStart(2, '0');

        const formattedDate = `${hours}:${minutes} ${year}-${month}-${day}`;
        console.log(formattedDate)
        console.log(formattedChargingFinishDate) 
    }

    return(
        <View style={ChargingMenuStyle.container}>
            { userData && 
            <>
            <Text style={ChargingMenuStyle.text}>Charging Status: {chargingStatus ? 'Charging': 'Not charging'}</Text>
            <View style={[MainPageStyle.battery, {marginBottom: 10}]}>
                <CircularProgression />
            </View>
            <TouchableOpacity onPress={() => {ChargingTimeCalculation(); ChargingPriceCalculation()}} style={ChargingMenuStyle.chargingButton}>
                <Text style={ChargingMenuStyle.buttonText}>{chargingStatus ? 'Stop Charging': 'Start Charging'}</Text>
            </TouchableOpacity>
            <Text style={ChargingMenuStyle.text}>Finishing Time: {formattedChargingFinishTime}</Text>
            <Text style={ChargingMenuStyle.text}>Charging Power: {userData.car.chargePower} kW</Text>
            <Text style={ChargingMenuStyle.text}>Battery Total Capacity: {userData.car.capacity} kWh</Text>
            <Text style={ChargingMenuStyle.text}>Battery Capacity Left: {capacityLeft} kWh</Text>
            {/* <Text style={ChargingMenuStyle.text}>Current Time: {}</Text> */}
            </>
            }
            {allPrices && 
            <>
                <Text style={ChargingMenuStyle.text}>Time/Date Price: {[allPrices[0][0].startTime, ' ', allPrices[0][0].startDate]}</Text>
            </>}
            <Text style={ChargingMenuStyle.text}>Current date/time: {}</Text>
        </View>
    )
}
export default ChargingMenu