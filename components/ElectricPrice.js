import { Button, Text, View, ScrollView, Pressable } from 'react-native';
import { ePriceStyle } from '../style/style';
import { useEffect, useState } from 'react';
import { child, push, ref, remove, update, onValue, set, get } from '@firebase/database';
import { db, PRICES_REF } from '../firebase/Config';
import { useIsFocused } from '@react-navigation/native';
import { BarChart } from "react-native-gifted-charts";
//import { ScrollView } from 'react-native-gesture-handler';


const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';

export default ElectricPrice = ({ navigation }) => {

    const [hourPrice, setHourPrice] = useState([]);
    const [allPrices, setAllPrices] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [firstDayPrice, setFirstDayPrice] = useState()
    const [secondDayPrice, setSecondDayPrice] = useState()
    const [allFirstDayPrices, setAllFirstDayPrices] = useState()
    const [allSecondDayPrices, setAllSecondDayPrices] = useState()
    const [barChartFirstData, setBarChartFirstData] = useState([])
    const [barChartFirstDataSelected, setBarChartFirstDataSelected] = useState(true)


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
                setHourPrice({price:price,time:hour});
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

            //console.log(dbPrice, 'haku db:stä')
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
                    endTime: priceData.endTime.split(":")[0],
                    startDate: priceData.startDate,
                    startTime: priceData.startTime.split(":")[0]
                })
            } else {
                pricesSecondDay.push(
                    {
                        price: priceData.price,
                        endDate: priceData.endDate,
                        endTime: priceData.endTime.split(":")[0],
                        startDate: priceData.startDate,
                        startTime: priceData.startTime.split(":")[0]
                    })
            }
        }

        )

        const allPricesFirstDay1 = []
        pricesFirstDay.map(data =>
            allPricesFirstDay1.push({ value: data.price, label: data.startTime, date: data.startDate })
        )
        const sortedFirstDayPrices = allPricesFirstDay1.sort(({ label: a }, { label: b }) => a.split(":")[0] - b.split(":")[0])

        const allPricesFirstDay2 = []
        pricesSecondDay.map(data =>
            allPricesFirstDay2.push({ value: data.price, label: data.startTime, date: data.startDate })
        )
        const sortedSecondDayPrices = allPricesFirstDay2.sort(({ label: a }, { label: b }) => a.split(":")[0] - b.split(":")[0])





        const priceFirstDay = pricesFirstDay.sort(({ price: a }, { price: b }) => b - a);
        const priceSecondDAy = pricesSecondDay.sort(({ price: a }, { price: b }) => b - a);
        const firstDayMaxPrice = priceFirstDay[0]
        const firstDayMinPrice = priceFirstDay[priceFirstDay.length - 1]
        const secondDayMaxPrice = priceSecondDAy[0]
        const secondDayMinPrice = priceSecondDAy[priceSecondDAy.length - 1]


        setFirstDayPrice({ maxPrice: firstDayMaxPrice, minPrice: firstDayMinPrice })
        setSecondDayPrice({ maxPrice: secondDayMaxPrice, minPrice: secondDayMinPrice })
        setAllFirstDayPrices(sortedFirstDayPrices)
        setAllSecondDayPrices(sortedSecondDayPrices)
        setBarChartFirstData(sortedFirstDayPrices)
        console.log(firstDayMaxPrice, "isoin hinta")
        console.log(firstDayMinPrice, "Pienin hinta")
        console.log(secondDayMaxPrice, "isoin hinta")
        console.log(secondDayMinPrice, "Pienin hinta")


    }
    function handlePress(item, firstData) {
        setBarChartFirstData(item)
        setBarChartFirstDataSelected(firstData)
    }


    const removePrices = () => {
        remove(ref(db, PRICES_REF));

    }

    // console.log(isLoading)
    //console.log(firstDayPrice)
    //console.log(allSecondDayPrices,"Kaikki tokan päivän")
    //console.log(allFirstDayPrices,"kaikki ekan päivän")
    //console.log(allPrices,"kaikki hinnat")
    return (

        <ScrollView style={{ flex: 1, }}
            contentContainerStyle={{ justifyContent: "flex-start", alignItems: "stretch" }}
            overScrollMode='never'
        >
            <View style={ePriceStyle.container}>
                {/* <Text style={ePriceStyle.headline}>Electricity price</Text> */}


                {/* <View style={ePriceStyle.container3}>
                    <View style={ePriceStyle.bghourprice2}>
                        <Text style={ePriceStyle.headline3}>Hourly price {"\n"} at {hourPrice.time} o'clock: {"\n"}{hourPrice.price} snt/kWh</Text>
                    </View> */}
                <View style={ePriceStyle.bigBox}>
                    <View>
                        {/* <Text style={ePriceStyle.headline2}>Hourly price</Text> */}
                    </View>
                    <View style={ePriceStyle.hourPriceBox}>
                        <Text style={ePriceStyle.headline2}>Hourly price</Text>
                        <Text style={ePriceStyle.headline5}>at {hourPrice.time} o'clock:</Text>
                        <Text style={ePriceStyle.headline3}>{hourPrice.price} c/kWh</Text>
                    </View>
                </View>

                {/* </View> */}


                <View style={ePriceStyle.bigBox}>
                    <View style={ePriceStyle.hourPriceBox}>
                        <Text style={ePriceStyle.headline3}>Hourly price</Text>
                        <Text style={ePriceStyle.headline5}>at {hourPrice.time} o'clock:</Text>
                        <Text style={ePriceStyle.headline3}>{hourPrice.price} c/kWh</Text>
                    </View>
                </View>


                <View style={ePriceStyle.boxes}>
                    <View>
                        <Text style={ePriceStyle.headline3}>Day: {secondDayPrice?.minPrice.startDate}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={ePriceStyle.square}>
                            <Text style={ePriceStyle.headline4}>Time:{"\n"}{secondDayPrice?.minPrice.startTime} - {secondDayPrice?.minPrice.endTime}</Text>
                            <Text style={ePriceStyle.headline4}>Lowest price:{"\n"}{secondDayPrice?.minPrice.price} c/kWh</Text>

                        </View>
                        <View style={ePriceStyle.square2}>
                            <Text style={ePriceStyle.headline4}>Time:{"\n"}{secondDayPrice?.maxPrice.startTime} - {secondDayPrice?.maxPrice.endTime}</Text>
                            <Text style={ePriceStyle.headline4}>Highest price:{"\n"}{secondDayPrice?.maxPrice.price} c/kWh</Text>

                        </View>
                    </View>

                </View>
                <View style={ePriceStyle.boxes}>
                    <View>
                        <Text style={ePriceStyle.headline3}>Day: {firstDayPrice?.minPrice.startDate}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={ePriceStyle.square}>
                            <Text style={ePriceStyle.headline4}>Time:{"\n"}{firstDayPrice?.minPrice.startTime} - {firstDayPrice?.minPrice.endTime} </Text>
                            <Text style={ePriceStyle.headline4}>Lowest price:{"\n"}{firstDayPrice?.minPrice.price} c/kWh</Text>

                        </View>
                        <View style={ePriceStyle.square2}>
                            <Text style={ePriceStyle.headline4}>Time:{"\n"}{firstDayPrice?.maxPrice.startTime} - {firstDayPrice?.maxPrice.endTime} </Text>
                            <Text style={ePriceStyle.headline4}>Highest price:{"\n"}{firstDayPrice?.maxPrice.price} c/kWh</Text>

                        </View>
                    </View>

                </View>
                <View style={ePriceStyle.diagram}>
                    <View style={ePriceStyle.pressablesLoc}>
                        <Pressable style={[ePriceStyle.pressable, barChartFirstDataSelected ? ePriceStyle.pressableSelected : ePriceStyle.pressableNotSelected]}
                            onPress={() => handlePress(allFirstDayPrices, true)}
                        >
                            <Text style={ePriceStyle.pressableText}>{firstDayPrice?.minPrice.startDate}</Text>
                        </Pressable>
                        <Pressable style={[ePriceStyle.pressable, !barChartFirstDataSelected ? ePriceStyle.pressableSelected : ePriceStyle.pressableNotSelected]}
                            onPress={() => handlePress(allSecondDayPrices, false)}
                        >
                            <Text style={ePriceStyle.pressableText}>{secondDayPrice?.minPrice.startDate}</Text>
                        </Pressable>
                    </View>
                    <View style={ePriceStyle.ckwhLoc}>
                        <Text style={ePriceStyle.ckwh}>c/kWh</Text>
                    </View>
                    {/* #177AD5 */}
                    <BarChart
                        frontColor={'#33cc7f'}
                        barWidth={16}
                        initialSpacing={10}
                        spacing={10}
                        data={barChartFirstData}
                        yAxisThickness={2}
                        xAxisThickness={2}
                        noOfSections={5}
                        xAxisColor={'lightgray'}
                        yAxisColor={'lightgray'}
                        yAxisTextStyle={{ color: 'lightgray' }}
                        xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
                        



                    />
                    <Text style={ePriceStyle.dateText}>{barChartFirstData[0]?.date}</Text>




                </View>


            </View>
        </ScrollView>

    );
}