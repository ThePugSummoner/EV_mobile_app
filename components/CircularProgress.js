import React from 'react-native';
import { Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { MainPageStyle } from '../style/style';

const CircularProgression = () => {
    
    const circleValue = 50;
    const titleShow = "300 km";

    return (
        <View style={MainPageStyle.circularContainer}>
            <View>
                <CircularProgress
                    value={circleValue}
                    radius={100}
                    progressValueColor={'#ffffff'}
                    duration={2500}
                    strokeColorConfig={[
                        { color: '#ff0000', value: 1 },
                        { color: '#ff9100', value: 25 },
                        { color: '#fffb00', value: 50 },
                        { color: '#1eb400', value: 100 },
                    ]}
                    maxValue={100}
                    valueSuffix={'%'}
                    inActiveStrokeColor={'#0b091d'}
                    inActiveStrokeOpacity={0.5}
                    inActiveStrokeWidth={20}
                    activeStrokeWidth={20}
                    dashedStrokeConfig={{
                        count: 50,
                        width: 3,
                    }} 
                    title={titleShow}
                    titleColor={"#06b900"}
                    titleStyle={MainPageStyle.circleTitle}
                    progressValueStyle={MainPageStyle.circleProgress}
                />
            </View>
            {/*<View style={MainPageStyle.charging}>
                <Text style={MainPageStyle.chargingText}>CHARGING</Text>
            </View> */}
        </View>
    )
}

export {CircularProgression}