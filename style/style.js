import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import Constants from "expo-constants"

const CharginStationsStyle = StyleSheet.create({
    container:{
        container: {
            paddingTop: Constants.statusBarHeight,
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
})

export {CharginStationsStyle}

const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1A39',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLogin: {
        backgroundColor: '#E5D9B6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        paddingLeft: 60,
        paddingRight: 60,
        borderRadius: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cbb26a',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 100,
        alignItems: 'center',
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#cbb26a',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 300,
        alignItems: 'center',
        fontSize: 20,
        textAlign: 'center',
        color: '#E5D9B6'
    }
}) 

export {HomeStyle}