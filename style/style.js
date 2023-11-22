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
        justifyContent: 'space-around',
        padding: 30,
        borderRadius: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cbb26a',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        fontSize: 15,
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

const ProfileStyle = StyleSheet.create({
container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"stretch"
},
avatar:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    padding:10
},
avatarText:{
    textAlign:"left",
    width:"40%",
},
button:{
    height:Dimensions.get("window").height * 0.1,
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row",
    gap:10,
    borderWidth:1,
},
buttonText:{
    fontSize:20
}


})

const ElectricityPriceStyle = StyleSheet.create({
    container:{
        backgroundColor: '#1D1A39',
        flex: 1,
    },
    container2:{
        backgroundColor: '#094F44',
        row: 3,
    },
    headline:{
        fontSize:30,
        color: '#E5D9B6',
        textAlign: 'center',
        marginTop: 30,
    }, headline2:{  
        fontSize:30,
        textAlign: 'center',
        margin: 10,
        color: '#ffffffff'
    
    }, headline3:{  
        fontSize:30,
        textAlign: 'center',
        margin: 15,
        color: '#ffffffff',
    }, button:{
       
    },bghourprice:{
        backgroundColor: '#1ED1B1',
       // borderRadius: 15,
    }
})

const MainPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1A39',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#22203a',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#b38c1a",
        borderRadius: 5,
        justifyContent: 'space-evenly'
    },
    standInText: {
        color: 'white',
    },
    carImage: {
        alignItems: 'center',
    },
    battery: {
        alignItems: 'center'
    },
    toggleButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 25
    },
    /*toggleButtonsSingular: {
        transform: [{rotate: '90deg'}],
    } */
    animatedText: {
        color: "#37306B",
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
    },
    circleProgress: {
        fontWeight: '200',
        color: 'black',
    },
    circleTitle: {
        textShadowColor: "#009600",
        textShadowRadius: 1,
        textShadowOffset: {width: 0, height: 1}
    },
    charging: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    chargingText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#31ac00',
        paddingTop: 10
    }

})

export {HomeStyle,ProfileStyle,CharginStationsStyle, ElectricityPriceStyle, MainPageStyle}