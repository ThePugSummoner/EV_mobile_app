import { Button, Text, View, ScrollView } from 'react-native';
import { ePriceStyle } from '../style/style';
import { useEffect, useState } from 'react';
import { child, push, ref, remove, update, onValue, set, get } from '@firebase/database';
import { db, PRICES_REF } from '../firebase/Config';
import { useIsFocused } from '@react-navigation/native';
import { BarChart } from "react-native-gifted-charts";
//import { ScrollView } from 'react-native-gesture-handler';


const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';

export default ElectricPrice = ({ navigation }) => {

    const [hourPrice, setHourPrice] = useState();
    const [allPrices, setAllPrices] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [firstDayPrice, setFirstDayPrice] = useState()
    const [secondDayPrice, setSecondDayPrice] = useState()
    const [allFirstDayPrices,setAllFirstDayPrices]=useState()
    const isFocused = useIsFocused();

    //Katsoo aikaa ja "onko käyttäjä sovelluksessa tässä näkymässä"
    useEffect(() => {

        if (isFocused && isLoading === false) {
            const time = checkTime()
            const endDateDb = allPrices.testi[0].endDate
            const date1 = date()

            console.log(date1, 'date1')
            console.log(endDateDb, 'endDate')
            if ("14:30" < time && endDateDb <= date1) {
                fetchPrices()
                console.log("Data päivitetty!");

            } else {
                console.log("Ei päivitettävää!")
            }
        }
    }, [isFocused]);


    function addZero(i) {
        if (i < 10) {
            i = `0${i}`
        }
        return i;
    }

    //kellonaika
    function checkTime() {
        const newDate = new Date();
        const newHour = addZero(newDate.getHours());
        const newMinute = addZero(newDate.getMinutes());
        const hourAndMinute = `${newHour}:${newMinute}`;
        console.log(hourAndMinute, 'tunti ja minuutti');
        return hourAndMinute
    }

    //tämä päivä (pvm.)
    function date() {
        const newDate = new Date();
        console.log(newDate, 'päivämäärä');

        const newYear = newDate.getFullYear();
        const newMonth = addZero(newDate.getMonth() + 1);
        const newDay = addZero(newDate.getDate());

        return `${newYear}-${newMonth}-${newDay}`

    }


    //tuntihinta sähkölle - Hourly price for electricity
    useEffect(() => {
        const dateAndTimeNow = new Date();
        const date = dateAndTimeNow.toISOString().split('T')[0];
        const hour = dateAndTimeNow.getHours();
        (async () => {
            const response = await fetch(`https://api.porssisahko.net/v1/price.json?date=${date}&hour=${hour}`);
            try {
                const { price } = await response.json();
                setHourPrice(price);
                //console.log(`Hinta nyt on ${price}`);
            } catch (error) {
                alert(error);
            }
        })();
    }, []);

    // 48 tunnin sähköhintojen haku
    useEffect(() => {
        console.log("useEffect")
        const dbRef = ref(db, PRICES_REF);
        get(dbRef).then((snapshot) => {

            const data = snapshot.val() ? snapshot.val() : {};
            const dbPrice = { ...data };

            console.log(dbPrice, 'haku db:stä')
            //rajapintahaku jos db on tyhjä
            if (Object.keys(dbPrice).length === 0 && isLoading) {

                fetchPrices()
            } else {
                setAllPrices(dbPrice)
                setIsLoading(false)
                testi(dbPrice.testi)
                console.log("Haku firebasesta onnistui!")
                //console.log(dbPrice,"else")
            }

        });

    }, []);



    async function fetchPrices() {
        try {
            const arr = [];
            const response = await fetch(LATEST_PRICES_ENDPOINT);
            const { prices } = await response.json();
            for (let i = 0; i < prices.length; i++) {
                const startTime = `${prices[i].startDate.split('T')[1].split(":")[0]} : ${prices[i].startDate.split('T')[1].split(":")[1]}`
                const endTime = `${prices[i].endDate.split('T')[1].split(":")[0]} : ${prices[i].endDate.split('T')[1].split(":")[1]}`
                arr.push({ startDate: prices[i].startDate.split('T')[0], startTime: startTime, endDate: prices[i].endDate.split('T')[0], endTime: endTime, price: prices[i].price });
            }
            set(ref(db, PRICES_REF + 'testi'), arr)
            setAllPrices(arr)
            testi(arr)
            setIsLoading(false)
            //console.log(arr.length, 'array useEffect1');
            //console.log(arr,"arr")
            console.log("Haku rajapinnasta onnistui!")
        } catch (e) {
            alert(e)
        }
    }

    function testi(item) {
        const pricesFirstDay = []
        const pricesSecondDay = []
        console.log(item[0].endDate, "item")
        //console.log(item,"miltä itemi näyttää")
        item.map(priceData => {
            if (item[0].startDate === priceData.startDate) {
                pricesFirstDay.push({
                    price: priceData.price,
                    endDate: priceData.endDate,
                    endTime: priceData.endTime,
                    startDate: priceData.startDate,
                    startTime: priceData.startTime
                })
            } else {
                pricesSecondDay.push(
                    {
                        price: priceData.price,
                        endDate: priceData.endDate,
                        endTime: priceData.endTime,
                        startDate: priceData.startDate,
                        startTime: priceData.startTime
                    })
            }
        }

        )
       
        const priceFirstDay = pricesFirstDay.sort(({ price: a }, { price: b }) => b - a);
        const priceSecondDAy = pricesSecondDay.sort(({ price: a }, { price: b }) => b - a);
        const firstDayMaxPrice = priceFirstDay[0]
        const firstDayMinPrice = priceFirstDay[priceFirstDay.length - 1]
        const secondDayMaxPrice = priceSecondDAy[0]
        const secondDayMinPrice = priceSecondDAy[priceSecondDAy.length - 1]
        const allPricesFirstDay1= []
        pricesFirstDay.map(data => 
            allPricesFirstDay1.push({value:data.price,label:data.startTime})
            )
        setFirstDayPrice({ maxPrice: firstDayMaxPrice, minPrice: firstDayMinPrice })
        setSecondDayPrice({ maxPrice: secondDayMaxPrice, minPrice: secondDayMinPrice })
        setAllFirstDayPrices(allPricesFirstDay1)
        console.log(firstDayMaxPrice, "isoin hinta")
        console.log(firstDayMinPrice, "Pienin hinta")
        console.log(secondDayMaxPrice, "isoin hinta")
        console.log(secondDayMinPrice, "Pienin hinta")


    }



    const removePrices = () => {
        remove(ref(db, PRICES_REF));

    }


    console.log(isLoading)
    console.log(firstDayPrice)
    console.log(allFirstDayPrices,"kaikki ekan päivän")
    //console.log(allPrices,"kaikki hinnat")
    return (

        <ScrollView style={{ flex: 1, }}
            contentContainerStyle={{ justifyContent: "flex-start", alignItems: "stretch" }}
            overScrollMode='never'
        >
            <View style={ePriceStyle.container}>
                {/* <View style={ePriceStyle.header}></View> */}
                <Text style={ePriceStyle.headline}>Electricity price</Text>

                <View style={ePriceStyle.container2}>
                    {/* <Text style={ePriceStyle.headline2}>Tuntihinta</Text> */}
                    <View style={ePriceStyle.bghourprice}>
                        <Text style={ePriceStyle.headline2}>Hourly price:</Text>
                        <Text style={ePriceStyle.headline3}>{hourPrice} snt/kWh</Text>
                    </View>
                </View>
                <View style={ePriceStyle.container3}>
                    <View style={ePriceStyle.bghourprice2}>
                        <Text style={ePriceStyle.headline3}>Hourly price: {"\n"}{hourPrice} snt/kWh</Text>
                    </View>
                    <View style={ePriceStyle.container3}>
                        <View style={ePriceStyle.bghourprice2}>
                            <Text style={ePriceStyle.headline2}>Hourly price:</Text>
                            <Text style={ePriceStyle.headline3}>{hourPrice} snt/kWh</Text>
                        </View>
                    </View>
                </View>


                <View style={ePriceStyle.container3}><Text style={ePriceStyle.headline3}>Hourly price:</Text>
                    <View style={ePriceStyle.bghourprice2}>

                        <Text style={ePriceStyle.headline3}>{hourPrice} snt/kWh</Text>
                    </View>
                </View>


                <View style={ePriceStyle.testi}>
                    <View>
                        <Text style={ePriceStyle.headline3}>Day: {secondDayPrice?.minPrice.startDate}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={ePriceStyle.square}>
                            <Text style={ePriceStyle.headline4}>Lowest price:{"\n"}{secondDayPrice?.minPrice.price}</Text>
                            <Text style={ePriceStyle.headline4}>Time:{"\n"}{secondDayPrice?.minPrice.startTime} - {secondDayPrice?.minPrice.endTime}</Text>
                        </View>
                        <View style={ePriceStyle.square2}>
                            <Text style={ePriceStyle.headline4}>Highest price:{"\n"}{secondDayPrice?.maxPrice.price}</Text>
                            <Text style={ePriceStyle.headline4}>Time:{"\n"}{secondDayPrice?.maxPrice.startTime} - {secondDayPrice?.maxPrice.endTime}</Text>
                        </View>
                    </View>

                </View>
                <View style={ePriceStyle.testi}>
                    <View>
                        <Text style={ePriceStyle.headline3}>Day: {firstDayPrice?.minPrice.startDate}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={ePriceStyle.square}>
                            <Text style={ePriceStyle.headline4}>Lowest price:{"\n"}{firstDayPrice?.minPrice.price}</Text>
                            <Text style={ePriceStyle.headline4}>Time:{"\n"}{firstDayPrice?.minPrice.startTime} - {firstDayPrice?.minPrice.endTime}</Text>
                        </View>
                        <View style={ePriceStyle.square2}>
                            <Text style={ePriceStyle.headline4}>Highest price:{"\n"}{firstDayPrice?.maxPrice.price}</Text>
                            <Text style={ePriceStyle.headline4}>Time:{"\n"}{firstDayPrice?.maxPrice.startTime} - {firstDayPrice?.maxPrice.endTime}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 2 }}>
                    <BarChart
                        frontColor={'#177AD5'}
                        barWidth={22}
                        
                    />
                </View>

                <View>
                    <Button title="Remove" onPress={() => removePrices()}></Button>

                </View>


            </View>
        </ScrollView>

    );
}