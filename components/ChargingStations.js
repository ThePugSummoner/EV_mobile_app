import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import  { Marker, Circle, animateToRegion } from 'react-native-maps';
import MapView from "react-native-map-clustering";
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
const RADIUS = 50000



export default ChargingStation = ({ navigation }) => {
    const [latitude, setLatitude] = useState(INITIAL_LATITUDE)
    const [longitude, setLongitude] = useState(INITIAL_LONGITUDE)
    const [longitudeDelta,setLongitudeDelta]=useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingData, setIsloadingData] = useState(true)
    const [data, setData] = useState([])
    const [dataClose, setDataClose] = useState([])
    const [showCloseData, setShowCloseData] = useState(false)
    const [scrollIndex, setScrollIndex] = useState("")
    //Alla päivitystä varten olevat
    const [closeDataLocation,setCloseDataLocation]=useState()
    const [updateCloseData,setUpdateCloseData]=useState(false)

    //UseRef
    const map = useRef(null);
    const bottomSheetRef = useRef(null);
    const scrollViewRef = useRef(null)

    //useEffect latausasemille
    useEffect(() => {
        charginStationData()
    }, [])
    //UseEffect käyttäjän locaatiolle
    useEffect(() => {
        userLocationData()
        setIsLoading(false)
    }, [])
//Voidaan lähimmät asemat päivittää , kun liikuttuna tarpeeksi 
useEffect(()=>{
if(showCloseData){
    if(RADIUS<haversineDistanceBetweenPoints(closeDataLocation.latitude,closeDataLocation.longitude,latitude,longitude)){
        setUpdateCloseData(true)  
    }
    
}else{
    setUpdateCloseData(false)
}
},[latitude,longitude,showCloseData])

    //Käyttäjän locatio haetaan
    async function userLocationData() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
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
    }

    //haetaan latausasemien tiedot OpenStreetMapista
    async function charginStationData() {
        try {
            const api = await fetch('https://overpass-api.de/api/interpreter?', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: `[out:json][timeout:25];
                area(id:3600054224)->.searchArea;
                nwr["amenity"="charging_station"](area.searchArea);
                out geom;`
            });
            let answer = await api.json();
            answer = answer.elements
            console.log(answer.length,"length")
            const arr = []
            for (let i = 0; i < answer.length; i++) {
                if(answer[i].type==="node"){
                    arr.push({
                        id: answer[i].id,
                        name: answer[i].tags.name === undefined ? "Sähköauton latausasema" : answer[i].tags.name,
                        latitude: answer[i].lat,
                        longitude: answer[i].lon,
                        brand: answer[i].tags.brand,
                        operator: answer[i].tags.operator,
                        capacity: answer[i].tags.capacity,
                        socket: answer[i].tags.socket,
                        selected: false
                    })
                }
               
            }
            setData(arr)
            setIsloadingData(false)

        } catch (e) {
            console.log(e)
        }
    }

    //Lähimmät latausasemat
    function getClosestData() {
        const arr = []

        data.map((mapData, index) => {
            if (haversineDistanceBetweenPoints(latitude, longitude, mapData.latitude, mapData.longitude) < RADIUS) {
                arr.push({...mapData,range:haversineDistanceBetweenPoints(latitude, longitude, mapData.latitude, mapData.longitude)})
            }
        })
        arr.sort((a, b) => a.range - b.range);
        setDataClose(arr)
        return arr

    }

    // liikutaan näytöllä niin päivittää sijainnin
    function regionChange(region) {
        setLatitude(region.latitude)
        setLongitude(region.longitude)
        setLongitudeDelta(region.longitudeDelta)
        //console.log(region)
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

    }

    //buttonille millä saadaa lähimmät asemat slideriin
    // Samaa käytetään myös päivittämiseen.
    function handleCloseDataPress() {
        const arr = getClosestData()
        if (arr.length === 0) {
            Alert.alert("Info", "There are no charging stations in that area.")
            bottomSheetRef.current?.close()
        } else {
            setShowCloseData(true)
            handleOpenPress()
            setScrollIndex(0)
            scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true})
            setCloseDataLocation({latitude:latitude,longitude:longitude})
            setUpdateCloseData(false)
        }
    }

    const isCloseToRight = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToRight = 20;
        return layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight;
    };

    //ScrollView scrollin tarkkailu
    function handleScroll(event) {
        //console.log(dataClose.length, "length")
        //console.log(scrollIndex, "scrollIndex")

        const closeRight=isCloseToRight(event.nativeEvent)
        const mod = modulo(parseInt(event.nativeEvent.contentOffset.x), 320)
        if(closeRight===true){
            const arr = []
            const item = dataClose[dataClose.length - 1]
            data.map(data => {
                if (data.id === item.id) {
                    arr.push({ ...data, selected: true })
                } else {
                    arr.push({ ...data, selected: false })
                }
            })
            setData(arr)
            setScrollIndex(dataClose.length - 1)
            map.current.animateToRegion({ latitude: item.latitude, longitude: item.longitude, latitudeDelta: INITIAL_LATITUDE_DELTA, longitudeDelta: INITIAL_LONGITUDE_DELTA })
        }else if (mod === false) {
            return //console.log("modulo false")
        }
         if (parseInt(event.nativeEvent.contentOffset.x / 320) !== scrollIndex) {

            const arr = []
            const item = dataClose[parseInt(event.nativeEvent.contentOffset.x / 320)]
            map.current.animateToRegion({ latitude: item.latitude, longitude: item.longitude, latitudeDelta: INITIAL_LATITUDE_DELTA, longitudeDelta: INITIAL_LONGITUDE_DELTA })
            data.map(data => {
                if (data.id === item.id) {
                    arr.push({ ...data, selected: true })
                } else {
                    arr.push({ ...data, selected: false })
                }
            })
            setData(arr)
            setScrollIndex(Math.floor(parseInt(event.nativeEvent.contentOffset.x / 320)))
           
            //console.log(parseInt(event.nativeEvent.contentOffset.x / 320))
           // console.log(Math.floor(parseInt(event.nativeEvent.contentOffset.x)))
            //console.log(scrollIndex, "Iffissä scroll index")
        }

    }

  
    function modulo(number, modulo) {
        let answer
        if (number % modulo === 0) {
            answer = true
        } else {
            answer = false
        }
        return answer
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
            setData(datas => {
                return datas.map(item => {
                  return item.selected === true ? { ...item, selected: false } : item
                })
              })

        }
    }, []);

    const currentZoomLevel = Math.round(
        Math.log(360 / longitudeDelta) / Math.LN2
        );
        //console.log(currentZoomLevel,"zoom zoom")
    //console.log(data, "useState")
    //console.log(dataClose, "dataClose useState")
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
                        loadingEnabled={true}
                        minZoom={1}
                        minPoints={currentZoomLevel>5 ? 10 : 2}
                        maxZoom={7}
                        clusterColor='red'
                        radius={currentZoomLevel<=7 ? Dimensions.get("window").width * 0.2 : Dimensions.get("window").width * 0.06}
                        
                      
                    >
                        {data.map((marker, index) =>
                            <Marker key={index}
                             title={marker.name}
                              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                              tracksViewChanges={false}
                              >
                                <FontAwesome5 name="map-marker-alt" size={marker.selected ? 1.25 * 24 : 24} color={marker.selected ? "orange" : "red"} />
                            </Marker>)}
                            
                        <Circle
                            center={{ latitude: latitude, longitude: longitude }}
                            radius={RADIUS}
                            fillColor='#6599f968'
                        />


                    </MapView>
                    {updateCloseData && <View style={{height:Dimensions.get("window").height * 0.05,width:Dimensions.get("window").width*0.5,position: 'absolute', top: 10, left:"25%", right:"25%", bottom: 0, justifyContent: 'center',alignSelf:"center"}}>
                    <TouchableOpacity onPress={()=>handleCloseDataPress()}  style={{ flex: 1,backgroundColor:"#ffffffd7", padding: 10 ,borderRadius:4}}>
                            <Text style={{ textAlign: "center" }}>Update List</Text>
                        </TouchableOpacity>
                    </View>}
                   
                    {!showCloseData ?
                        <TouchableOpacity onPress={() => handleCloseDataPress()} style={{ flex: 1, position: "absolute", bottom: 50, right: 0, backgroundColor: "#ffffffd7", marginBottom: 20, padding: 10 }}>


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
                            backgroundStyle={{ backgroundColor: '#ffffff' }}


                        >
                            <BottomSheetScrollView
                                ref={scrollViewRef}
                                horizontal={true}
                                snapToInterval={300 + 20}
                                disableIntervalMomentum={true}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                pagingEnabled
                                decelerationRate={"fast"}
                                scrollEventThrottle={16}
                                onScroll={(e) => handleScroll(e)}



                            >
                                {dataClose.map((dataClose, index) =>
                                    <Pressable key={index} onPress={() => handlePress(dataClose)}>
                                        <View style={{ borderWidth: 1, height: 150, width: 300, backgroundColor: "#fff3be", marginHorizontal: 10, justifyContent: "flex-start", alignItems: "flex-start", padding: 10, gap: 20, borderRadius: 4, flexDirection: "row-reverse" }}>

                                            <View style={{ height: 80, width: 100, borderWidth: 1, justifyContent: "flex-start", alignItems: "center", marginTop: 10, backgroundColor: "#1D1A39", borderRadius: 4 }}>
                                                <Image style={{ flex: 1 }} source={Logo} resizeMode='contain' />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ flex: 1, flexWrap: "wrap" }}>{dataClose.name}</Text>
                                                <Text style={{ flex: 1, flexWrap: "wrap" }}>{dataClose.operator}</Text>

                                            </View>


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





