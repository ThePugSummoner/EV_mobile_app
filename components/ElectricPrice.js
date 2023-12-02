import { Button, Text, View, ScrollView } from 'react-native';
import { ePriceStyle } from '../style/style';
import { useEffect, useState } from 'react';
import { child, push, ref, remove, update, onValue, set, get } from '@firebase/database';
import { db, PRICES_REF } from '../firebase/Config';
import { useIsFocused } from '@react-navigation/native';
//import { ScrollView } from 'react-native-gesture-handler';


const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';

export default ElectricPrice = ({ navigation }) => {

    const [hourPrice, setHourPrice] = useState();
    const [allPrices, setAllPrices] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [firsDayPrice,setFirstDayPrice]=useState()
    const isFocused = useIsFocused();

    //Katsoo aikaa ja "onko käyttäjä sovelluksessa tässä näkymässä"
    useEffect(() => {

        if (isFocused && isLoading === false) {
            const time = checkTime()
            const endDateDb = allPrices.testi[0].endDate.split('T')[0]
            const date1 = date()



            console.log(date1, 'date1')
            console.log(endDateDb, 'endDate')


            if ("14:30" < time && "2023-11-26" === date1) {
                console.log(`${time} on isompi kuin 14:30`);

            } else {
                console.log(`${time} on pienempi 14:30`)
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

            // onValue(priceRef, (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : {};
            const dbPrice = { ...data };
            //console.log(Object.keys(dbPrice).length,'Haku db:stä');
            console.log(dbPrice, 'haku db:stä')
            //rajapintahaku jos db on tyhjä
            if (Object.keys(dbPrice).length === 0 && isLoading) {

                (async () => {

                    try {
                        const arr = [];
                        const response = await fetch(LATEST_PRICES_ENDPOINT);
                        const { prices } = await response.json();
                        //console.log(prices, 'kokodata');
                        for (let i = 0; i < prices.length; i++) {

                            arr.push({ startDate: prices[i].startDate, endDate: prices[i].endDate, price: prices[i].price });
                        }
                        // const newPrices = push(child(ref(db), PRICES_REF)).key;
                        // const updates = {};
                        // updates[PRICES_REF + newPrices] = arr;
                        // update(ref(db), updates);
                        set(ref(db, PRICES_REF + 'testi'), arr)
                        //Lisätty useState set
                        setAllPrices(arr)
                        testi(arr)
                        setIsLoading(false)
                        console.log(arr.length, 'array useEffect');
                        console.log(arr,"arr")
                        //console.log(`Hinta nyt on ${price}`);
                    } catch (error) {
                        alert(error);
                    }
                })();
                //Else lisätty jossa on sitten myös useState set. Sillä laitetaan jo valmiina oleva Db data
            } else {
                setAllPrices(dbPrice)
                setIsLoading(false)
                testi(dbPrice.testi)
                //console.log(dbPrice,"else")
            }

        });

    }, []);

    function testi(item){
        const pricesFirstDay =[]
        const pricesSecondDay =[]
        console.log(item[0].endDate,"item")
        item.map(priceData =>
          {
            if(item[0].endDate.split('T')[0]===priceData.endDate.split('T')[0]){
                pricesFirstDay.push({price:priceData.price,
                    time:priceData.endDate
                    })
            }else{
                pricesSecondDay.push({price:priceData.price,
                    time:priceData.endDate
                    })
            }}

            )
        const priceFirstDay=pricesFirstDay.sort(({ price: a }, { price: b }) => b - a);
        const priceSecondDAy=pricesSecondDay.sort(({ price: a }, { price: b }) => b - a);
        const firstDayMaxPrice = priceFirstDay[0]
        const firstDayMinPrice =priceFirstDay[priceFirstDay.length-1]
        const secondDayMaxPrice = priceSecondDAy[0]
        const secondDayMinPrice =priceSecondDAy[priceSecondDAy.length-1]
            setFirstDayPrice({maxPrice:firstDayMaxPrice,minPrice:firstDayMinPrice})
        console.log(firstDayMaxPrice,"isoin hinta")
        console.log(firstDayMinPrice,"Pienin hinta")
        console.log(secondDayMaxPrice,"isoin hinta")
        console.log(secondDayMinPrice,"Pienin hinta")
 
        
    }



    const removePrices = () => {
        remove(ref(db, PRICES_REF));
        // (async () => {
        //     const arr = [];
        //     const response = await fetch(LATEST_PRICES_ENDPOINT);
        //    try {
        //     const { prices } = await response.json();
        //     //console.log(prices, 'kokodata');
        //     for (let i = 0; i < prices.length; i++) {

        //         arr.push({startDate: prices[i].startDate, endDate: prices[i].endDate, price: prices[i].price});
        //     }
        //     const newPrices = push(child(ref(db), PRICES_REF)).key;
        //     const updates = {};
        //     updates[PRICES_REF + newPrices] = arr;
        //     update(ref(db), updates);
        //     //Lisätty useState set
        //     setAllPrices(arr)

        //     console.log(arr.length, 'array remove');
        //     //console.log(`Hinta nyt on ${price}`);
        //    } catch (error) {
        //     alert(error);
        //    }
        // })();
    }
    console.log(isLoading)
    console.log(firsDayPrice)
    //console.log(allPrices,"kaikki hinnat")
    return (
        
            <ScrollView style={{flex:1}}
            contentContainerStyle={{justifyContent:"flex-start",alignItems:"stretch"}}
            >
                <View style={ePriceStyle.container}>

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
                            <Text style={ePriceStyle.headline3}>Hourly price: {hourPrice} snt/kWh</Text>
                        </View>
                    </View>

                    <View style={ePriceStyle.testi}>
                        <View style={ePriceStyle.square}>
                            <Text style={ePriceStyle.headline4}>Lowest price:{firsDayPrice?.minPrice.price}</Text>
                            <Text style={ePriceStyle.headline4}>Day:{firsDayPrice?.minPrice.time.split('T')[0]}</Text>
                            <Text style={ePriceStyle.headline4}>Time:{firsDayPrice?.minPrice.time.split('T')[1].split(":")[0]} : {firsDayPrice?.minPrice.time.split('T')[1].split(":")[1]}</Text>
                        </View>
                        <View style={ePriceStyle.square2}>
                            <Text style={ePriceStyle.headline4}>Highest price:{firsDayPrice?.maxPrice.price}</Text>
                        </View>
                    </View>
                    <View>
                        <Button title="Remove" onPress={() => removePrices()}></Button>

                    </View>


                </View>
            </ScrollView>
        
    );
}