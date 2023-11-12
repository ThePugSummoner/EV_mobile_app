import { Text, View } from 'react-native';
import { ElectricityPriceStyle } from '../style/style';

export default ElectricityPrice = ({ navigation }) => {
    return (
        <View style = {ElectricityPriceStyle.container}>
            
            <Text style={ElectricityPriceStyle.headline}>Testi</Text>

            <View style = {ElectricityPriceStyle.container2}>

                <Text style={ElectricityPriceStyle.headline2}>Testi</Text>

            </View>

        </View>

    );
}