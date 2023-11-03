import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MapView ,{Marker}from 'react-native-maps';
import * as Location from "expo-location"
import { CharginStationsStyle } from '../style/style';
import { Dimensions } from 'react-native';
import Constants from "expo-constants"


const INITIAL_LATITUDE=65.0800
const INITIAL_LONGITUDE=25.4800
const INITIAL_LATITUDE_DELTA=0.0922
const INITIAL_LONGITUDE_DELTA=0.0421



export default ChargingStation = ({ navigation }) => {
    const [latitude, setLatitude] = useState(INITIAL_LATITUDE)
    const [longitude, setLongitude] = useState(INITIAL_LONGITUDE)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const api = await fetch('https://overpass-api.de/api/interpreter?', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: `[out:json][timeout:25];
                        area(id:3602711874)->.searchArea;
                        nwr["amenity"="charging_station"](area.searchArea);
                        out geom;`
                });
                let answer = await api.json();
                answer = answer.elements
                const arr = []
                for (let i = 0; i < answer.length; i++) {
                    arr.push({
                        id: answer[i].id,
                        name: answer[i].tags.name,
                        latitude: answer[i].lat,
                        longitude: answer[i].lon
                    })
                }
                setData(arr)

            } catch (e) {
                console.log(e)
            }
        })()

    }, [])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            try {
                if (status !== "granted") {
                    setIsLoading(false)
                    console.log("Geolocation failed.")
                    return
                }

                const location = await Location.getLastKnownPositionAsync(
                    { accuracy: Location.Accuracy.High })
                setLatitude(location.coords.latitude)
                setLongitude(location.coords.longitude)
                setIsLoading(false)

            } catch (e) {
                alert(e)
                setIsLoading(false)
            }


        })()

    }, [])





   // console.log(data, "useState")
    if (isLoading) {
        return <View style={CharginStationsStyle.container}><Text>Please wait a moment</Text></View>
    } else {


        return (
            <View style={CharginStationsStyle.container}>
                <MapView
                    style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height - Constants.statusBarHeight}}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: INITIAL_LATITUDE_DELTA,
                        longitudeDelta: INITIAL_LONGITUDE_DELTA
                    }}
                    mapType='hyprid'
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                >
                    {data.map((marker, index) => <Marker key={index} title={marker.name} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} pinColor='orange' />)}


                </MapView>
            </View>
        );
    }
}





