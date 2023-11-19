import { Button, Text, View } from 'react-native';
import { ElectricityPriceStyle } from '../style/style';
import { useEffect, useState } from 'react';
import { child, push, ref, remove, update, onValue, set, get } from '@firebase/database';
import { db, PRICES_REF } from '../firebase/Config';

const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';

export default ElectricPrice = ({ navigation }) => {

    const [hourPrice, setHourPrice] = useState();
    const [allPrices,setAllPrices] = useState();
    const [isLoading,setIsloading]=useState(true)

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
       console.log("useEffect")
        const dbRef = ref(db, PRICES_REF);
        let data = {};
        get(dbRef).then((snapshot) => {  
            if (snapshot.exists()) {
               data = snapshot.val();  
            } else {    
               // data = {}
                console.log("No data available");  }
            }).catch((error) => { 
                console.error(error);
            });
        // onValue(priceRef, (snapshot) => {
        //     const data = snapshot.val() ? snapshot.val() : {};
             const dbPrice = {...data};
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
                        
                        arr.push({startDate: prices[i].startDate, endDate: prices[i].endDate, price: prices[i].price});
                    }
                    // const newPrices = push(child(ref(db), PRICES_REF)).key;
                    // const updates = {};
                    // updates[PRICES_REF + newPrices] = arr;
                    // update(ref(db), updates);
                    set (ref(db, PRICES_REF+'testi'),arr)
                    //Lisätty useState set
                    setAllPrices(arr)
                    setIsloading(false)
                    console.log(arr.length, 'array useEffect');
                    //console.log(`Hinta nyt on ${price}`);
                   } catch (error) {
                    alert(error);
                   }
                })();
                //Else lisätty jossa on sitten myös useState set. Sillä laitetaan jo valmiina oleva Db data
             }else{
                setAllPrices(dbPrice)
                setIsloading(false)
                console.log("else")
             }
            
       // });
       
       

    }, []);

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
   //console.log(allPrices,"kaikki hinnat")
    return (
        <View style = {ElectricityPriceStyle.container}>
            
            <Text style={ElectricityPriceStyle.headline}>Sähkönhinta</Text>

            <View style = {ElectricityPriceStyle.container2}>
                <Text style={ElectricityPriceStyle.headline2}>Tuntihinta</Text>
                <View style = {ElectricityPriceStyle.bghourprice}>
                <Text style={ElectricityPriceStyle.headline3}>{hourPrice} snt/kWh</Text>
                </View>

            </View>
        <View>
            <Button title="Remove" onPress={()=> removePrices()}></Button>
          
        </View>
        </View>

    );
}