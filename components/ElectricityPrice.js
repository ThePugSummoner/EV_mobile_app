import { Text, View } from 'react-native';
import { ElectricityPriceStyle } from '../style/style';
import { useEffect, useState } from 'react';


export default ElectricityPrice = ({ navigation }) => {

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

    console.log(hourPrice);
    return (
        <View style = {ElectricityPriceStyle.container}>
            
            <Text style={ElectricityPriceStyle.headline}>{hourPrice} snt/kWh</Text>

            <View style = {ElectricityPriceStyle.container2}>

                <Text style={ElectricityPriceStyle.headline2}>Testi</Text>

            </View>

        </View>

    );
}