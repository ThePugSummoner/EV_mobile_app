import { Text, View } from 'react-native';
import { ElectricityPriceStyle } from '../style/style';
import { useEffect, useState } from 'react';
import { child, push, ref, remove, update, onValue } from '@firebase/database';
import { db, PRICES_REF } from '../firebase/Config';

const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';

export default ElectricPrice = ({ navigation }) => {

    const [hourPrice, setHourPrice] = useState();
    

    //tuntihinta sähkölle
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

    useEffect(() => {  
        const arr = [];
        const priceRef = ref(db, PRICES_REF);
        onValue(priceRef, (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : {};
            const dbPrice = {...data};
           console.log(Object.keys(dbPrice).length,'Haku db:stä');
            //rajapintahaku
            if (Object.keys(dbPrice).length === 0) {
              console.log("iffissä")
                /* (async () => {
                    
                    const response = await fetch(LATEST_PRICES_ENDPOINT);
                   try {
                    const { prices } = await response.json();
                    //console.log(prices, 'kokodata');
                    for (let i = 0; i < prices.length; i++) {
                        
                        arr.push({startDate: prices[i].startDate, endDate: prices[i].endDate, price: prices[i].price});
                    }
                    const newPrices = push(child(ref(db), PRICES_REF)).key;
                    const updates = {};
                    updates[PRICES_REF + newPrices] = arr;
                    update(ref(db), updates);
                    console.log(arr, 'array');
                    //console.log(`Hinta nyt on ${price}`);
                   } catch (error) {
                    alert(error);
                   }
                })(); */
             }
            
        });

    }, []);

  
   
    return (
        <View style = {ElectricityPriceStyle.container}>
            
            <Text style={ElectricityPriceStyle.headline}>{hourPrice} snt/kWh</Text>

            <View style = {ElectricityPriceStyle.container2}>

                <Text style={ElectricityPriceStyle.headline2}>Testi</Text>

            </View>

        </View>

    );
}