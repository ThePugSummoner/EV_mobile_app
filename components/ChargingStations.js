import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Circle, animateToRegion } from 'react-native-maps';
import * as Location from "expo-location"
import { CharginStationsStyle } from '../style/style';
import { Dimensions } from 'react-native';
import Constants from "expo-constants"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Logo from "../images/Volterra.png"
import { FontAwesome5 } from '@expo/vector-icons';



const INITIAL_LATITUDE = 65.0800
const INITIAL_LONGITUDE = 25.4800
const INITIAL_LATITUDE_DELTA = 0.0922
const INITIAL_LONGITUDE_DELTA = 0.0421
const RADIUS = 3500



export default ChargingStation = ({ navigation }) => {
    const [latitude, setLatitude] = useState(INITIAL_LATITUDE)
    const [longitude, setLongitude] = useState(INITIAL_LONGITUDE)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingData, setIsloadingData] = useState(true)
    const [data, setData] = useState([])
    const [dataClose, setDataClose] = useState([])
    const [showCloseData, setShowCloseData] = useState(false)

    //UseRef
    const map = useRef(null);
    const bottomSheetRef = useRef(null);
    const scrollViewRef = useRef(null)

    //haetaan latausasemien tiedot OpenStreetMapista
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
                        longitude: answer[i].lon,
                        selected: false
                    })
                }
                setData(arr)
                setIsloadingData(false)

            } catch (e) {
                console.log(e)
            }
        })()

    }, [])

    //Käyttäjän locatio haetaan
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            try {
                if (status !== "granted") {
                    setIsLoading(false)
                    console.log("Geolocation failed.")
                    return
                }

                const location = await Location.getCurrentPositionAsync(
                    { accuracy: Location.Accuracy.High })
                setLatitude(location.coords.latitude)
                setLongitude(location.coords.longitude)


            } catch (e) {
                alert(e)
                setIsLoading(false)
            }


        })()
        setIsLoading(false)
    }, [])

    // tarkastellaan lähimpiä asemia
    useEffect(() => {
        const arr = []
        if (isLoading !== true && isLoadingData !== true) {
            data.map((mapData, index) => {
                if (haversineDistanceBetweenPoints(latitude, longitude, mapData.latitude, mapData.longitude) < RADIUS) {
                    arr.push(mapData)
                }
            })
            if (arr.length === 0) {
                setShowCloseData(false)
            }
            setDataClose(arr)
        }

    }, [isLoadingData, isLoading, latitude, longitude])

    // liikutaan näytöllä niin päivittää sijainnin
    function regionChange(region) {
        setLatitude(region.latitude)
        setLongitude(region.longitude)
    }


    // Välimatka kahden locaation välillä metreinä.
    function haversineDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const p1 = lat1 * Math.PI / 180;
        const p2 = lat2 * Math.PI / 180;
        const deltaLon = lon2 - lon1;
        const deltaLambda = (deltaLon * Math.PI) / 180;
        const d = Math.acos(
            Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
        ) * R;
        return d;
    }

    // Painetaan slider itemistä niin päästään siihen "markeriin"
    function handlePress(item) {
        console.log(item)
        const arr = []
        data.map(data => {
            if (data.id === item.id) {
                arr.push({ ...data, selected: true })
            } else {
                arr.push({ ...data, selected: false })
            }
        })
        setData(arr)
        map.current.animateToRegion({ latitude: item.latitude, longitude: item.longitude, latitudeDelta: INITIAL_LATITUDE_DELTA, longitudeDelta: INITIAL_LONGITUDE_DELTA })
        scrollViewRef?.current?.scrollTo({ x: 0, y: 0, animated: false })

    }

    //buttonille millä saadaa lähimmät asemat slideriin
    function handleCloseDataPress() {
        if (dataClose.length === 0) {
            Alert.alert("Info", "There are no charging stations near you.")
        } else {
            setShowCloseData(true)
            handleOpenPress()
        }
    }
    //BottomSheetille snapPoint
    const snapPoints = useMemo(() => ["35%"], []);
    //Aukaisee BottomSheetScrollview
    const handleOpenPress = () => bottomSheetRef.current?.expand();
    //antaa indexin missä vaiheessa bottomSheet on -1 ei näkyvillä.
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
        if (index === -1) {
            setShowCloseData(false)
        }
    }, []);

    //console.log(data, "useState")
    console.log(dataClose, "dataClose useState")
    //console.log(data,"kaikki data")
    if (isLoading && isLoadingData) {
        return <View style={CharginStationsStyle.container}><Text>Please wait a moment</Text></View>
    } else {

        return (
            <GestureHandlerRootView style={{ flex: 1 }}>

                <View style={CharginStationsStyle.container}>
                    <MapView
                        style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height - Constants.statusBarHeight }}
                        ref={map}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: INITIAL_LATITUDE_DELTA,
                            longitudeDelta: INITIAL_LONGITUDE_DELTA
                        }}
                        onRegionChangeComplete={region => regionChange(region)}
                        mapType='hyprid'
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        followsUserLocation={true}
                    >
                        {data.map((marker, index) =>
                            <Marker key={index} title={marker.name} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}>
                                <FontAwesome5 name="map-marker-alt" size={24} color={ marker.selected ? "orange" : "red" } />
                            </Marker>)}
                        <Circle
                            center={{ latitude: latitude, longitude: longitude }}
                            radius={RADIUS}
                            fillColor='#6599f968'
                        />


                    </MapView>
                    {!showCloseData ?
                        <TouchableOpacity onPress={() => handleCloseDataPress()} style={{ flex: 1, position: "absolute", bottom: 50, right: 0, backgroundColor: "red", marginBottom: 20, padding: 10 }}>


                            <Text style={{ textAlign: "center" }}>Show list</Text>
                        </TouchableOpacity>
                        :
                        <BottomSheet
                            ref={bottomSheetRef}
                            index={0}
                            snapPoints={snapPoints}
                            onChange={handleSheetChange}
                            enableContentPanningGesture={false}
                            enablePanDownToClose={true}
                            backgroundStyle={{ backgroundColor: '#ffffffff' }}

                        >
                            <BottomSheetScrollView
                                ref={scrollViewRef}
                                horizontal={true}
                                snapToInterval={300 + 20}
                                disableIntervalMomentum={true}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                pagingEnabled
                                decelerationRate={"fast"}


                            >
                                {dataClose.map((dataClose, index) =>
                                    <Pressable  key={index} onPress={() => handlePress(dataClose)}>
                                        <View style={{borderWidth:1, height: 150, width: 300, backgroundColor: "#d3d3d3e0", marginHorizontal: 10, justifyContent:"flex-start", alignItems:"flex-start",padding:10,gap:20,borderRadius:4 , flexDirection:"row-reverse"}}>
                                        
                                            <View style={{ height: 80, width: 100,borderWidth:1,justifyContent:"flex-start",alignItems:"center",marginTop:10,backgroundColor:"#1D1A39",borderRadius:4 }}>
                                                <Image style={{ flex: 1 }} source={Logo} resizeMode='contain' />
                                            </View>
                                            <Text style={{flex:1,flexWrap:"wrap"}}>{dataClose.name}</Text>
                                            
                                        </View>
                                    </Pressable>)}
                            </BottomSheetScrollView>
                        </BottomSheet>


                    }
                </View>

            </GestureHandlerRootView>
        );
    }
}





