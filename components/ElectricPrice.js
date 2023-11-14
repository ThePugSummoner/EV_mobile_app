import { Button, Text, View } from 'react-native';
import { ElectricityPriceStyle } from '../style/style';
import { useEffect, useState } from 'react';
import { child, push, ref, remove, update, onValue } from '@firebase/database';
import { db, PRICES_REF } from '../firebase/Config';

const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';

export default ElectricPrice = ({ navigation }) => {

    const [hourPrice, setHourPrice] = useState();
    const [allPrices,setAllPrices] = useState();

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

    // 48 tunnin sähköhintojen haku
    useEffect(() => {  
       
        const priceRef = ref(db, PRICES_REF);
        onValue(priceRef, (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : {};
            const dbPrice = {...data};
           //console.log(Object.keys(dbPrice).length,'Haku db:stä');
           //console.log(dbPrice)
            //rajapintahaku jos db on tyhjä
            if (Object.keys(dbPrice).length === 0) {
              
                (async () => {
                    const arr = [];
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
                    //Lisätty useState set
                    setAllPrices(arr)
                    console.log(arr.length, 'array');
                    //console.log(`Hinta nyt on ${price}`);
                   } catch (error) {
                    alert(error);
                   }
                })();
                //Else lisätty jossa on sitten myös useState set. Sillä laitetaan jo valmiina oleva Db data
             }else{
                setAllPrices(dbPrice)
             }
            
        });

    }, []);

    const removePrices = () => {
        remove(ref(db, PRICES_REF));
    }
  
   //console.log(allPrices,"kaikki hinnat")
    return (
        <View style = {ElectricityPriceStyle.container}>
            
            <Text style={ElectricityPriceStyle.headline}>{hourPrice} snt/kWh</Text>

            <View style = {ElectricityPriceStyle.container2}>

                <Text style={ElectricityPriceStyle.headline2}>Testi</Text>

            </View>
        <View>
            <Button title="Remove" onPress={()=> removePrices()}></Button>
          
        </View>
        </View>

    );
}