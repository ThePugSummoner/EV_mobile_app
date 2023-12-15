import { StyleSheet } from "react-native";
import { Dimensions, PixelRatio } from 'react-native';
import Constants from "expo-constants";

const fontScale = PixelRatio.getFontScale()
const getFontSize = size => size / fontScale

const Text = StyleSheet.create({
    fontSize: getFontSize(16),
    color:"#000000",
    fontWeight: "300",
    textShadowColor: "#000000ff",
    textShadowOffset: { width: 0.5, height: 0 },
    textShadowRadius:1
})
const ButtonShadow = StyleSheet.create({
    shadowColor: "#000000",
    elevation: 2,
})

const CharginStationsStyle = StyleSheet.create({
    markerColorBase: "red",
    markerColorSelected: "orange",
    markerSize: 24,
    container: {
        paddingTop: Constants.statusBarHeight + 5,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        ...Text
    },
    updateButtonContainer: {
        ...ButtonShadow,
        height: Dimensions.get("window").height * 0.05,
        width: Dimensions.get("window").width * 0.5,
        position: 'absolute',
        top: Dimensions.get("window").height * 0.003,
        left: "25%",
        right: "25%",
        justifyContent: 'center',
        alignSelf: "center",
        backgroundColor: "#ffffffff",
        borderRadius:8
    },
    updateText: {
        ...Text,
        textAlign: "center"
    },
    listButton: {
        ...ButtonShadow,
        flex: 1,
        position: "absolute",
        bottom: Dimensions.get("window").height * 0.01,
        right: 0,
        backgroundColor: "#ffffffd7",
        padding: 10,
        borderRadius: 8,
        marginRight: 8
    },
    listText: {
        ...Text,
        textAlign: "center"
    },
    sliderItemContainer: {
        ...ButtonShadow,
        borderWidth: 2,
        height: Dimensions.get("window").height * 0.2,
        width: 300,
        backgroundColor: "#fff3be",
        marginHorizontal: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 10,
        gap: 20,
        borderRadius: 4,
        flexDirection: "row-reverse",
        borderColor:"#cbb26a"
    },
    sliderItemImageContainer: {
        ...ButtonShadow,
        height: 80,
        width: 100,
        borderWidth: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: "#1D1A39",
        borderRadius: 4
    },
    sliderItemImage: {
        flex: 1
    },
    sliderItemText: {
        ...Text,
        flexWrap: "wrap",
        marginBottom:4
    }

})

const LogoAnimationStyle = StyleSheet.create({
    animationB: {
        backgroundColor: '#CBB26A',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        // borderColor:"#D8C690",
        // borderWidth:2,
    },
    animationBtext: {
        fontSize: 20,
        color: '#1a1a1a'
    },
})

const HomeStyle = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 5,
        flex: 1,
        backgroundColor: '#1D1A39',
        alignItems: "center",
        justifyContent: 'center',
    },
    header: {
        fontSize:getFontSize(24),
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: "center"
    },
    containerLogin: {
        backgroundColor: '#E5D9B6', //tämä sama sävy laitettu bottomnaviin
        alignItems: "stretch",
        justifyContent: 'space-around',
        padding: 30,
        borderRadius: 8,
    },
    containerRegister: {
        backgroundColor: '#E5D9B6', //tämä sama sävy laitettu bottomnaviin
        alignItems: "stretch",
        justifyContent:"space-evenly",
        padding:20,
        borderRadius: 8,
        
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#cbb26a',
        borderRadius: 8,
        padding: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        fontSize: 15,
        textAlign: 'center'
    },
    input: {
        borderWidth: 2,
        borderColor: '#cbb26a',
        borderRadius: 8,
        padding: 8,
        margin: 10,
        width: 250,
        alignItems: 'center',
        fontSize: 16,
        textAlign: 'center',
        color: '#000000'
    },
    text: {
        color: '#cbb26a',
        fontSize: 18,

    },
    loginButton: {
        ...ButtonShadow,
        backgroundColor: '#cbb26a',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10,

    },
    loginButtonText: {
        
        fontSize: 20,
        color: '#1a1a1a',
        //fontWeight: 'bold'
    },
})

const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: '#1D1A39',
    },
    /*profile: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }, */
    profileText: {
        fontSize: 25,
        color: '#ffffff'
    },
    avatar: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#cbb26a',
        //borderTopColor: '#00000000',
        padding: 10
    },
    avatarText: {
        textAlign: "center",
        width: "44%",
        color: '#E5D9B6',
        marginBottom: 2,
        fontSize: getFontSize(18)
    },
    button: {
        //height: Dimensions.get("window").height * 0.1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        gap: 12,
        borderWidth: 1,
        borderBottomColor: '#cbb26a',
        borderTopColor: '#cbb26a',
        flex: 1
    },
    icon: {
        marginLeft: 10
    },
    buttonText: {
        fontSize: 20,
        color: '#E5D9B6'
    }

})

const ePriceStyle = StyleSheet.create({
    container: {
        backgroundColor: '#1D1A39',
        flex: 1,
       
    },
    container2: {
        //backgroundColor: '#094F44',
        //row: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    hourPriceValue: {
        fontSize: getFontSize(25),
        color: 'white',
        textAlign: 'center',
        margin: 10,
    },
    hourAtClock: {
        fontSize: getFontSize(22),
        color: '#E5D9B6',
        textAlign: 'center',
        margin: 5,
    },
    headline2: {
        fontSize: getFontSize(29),
        textAlign: 'center',
        margin: 10,
        //marginTop: 20,
        color: '#E5D9B6',
        fontWeight: '400',
    },
    headline3: {
        fontSize: getFontSize(25),
        textAlign: 'center',
        margin: 10,
        marginBottom: 15,
        color: '#E5D9B6',
        fontWeight: '400',
    },
    headline4: {
        fontSize:getFontSize(19),
        textAlign: 'center',
        margin: 5,
        color: '#E5D9B6',
    },
    headline5: {
        fontSize: getFontSize(21),
        textAlign: 'center',
        //margin: 1,
        marginBottom: 4,
        color: '#ffffff',
        fontWeight: '500',
    },
    bghourprice: {
        //backgroundColor: '#1ED1B1',
        //borderRadius: 20,
        borderRadius: 150,
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        backgroundColor: '#094F44',//#094F44
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 3,
        borderColor: '#Cbb26a'//'#d8c690'//'#1ED1B1',

    },
    bigBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#094f458f',//'#451952af',
        borderRadius:8,
        width:Dimensions.get("window").width * 0.65,
        height:Dimensions.get("window").height * 0.30,
        alignSelf:"center",
        borderWidth: 3,
        borderColor: '#Cbb26a'

    },
    hourPriceBox: {
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.55,
        height: Dimensions.get('window').width * 0.35,
        backgroundColor: '#094F44',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        // borderWidth: 3,
        // borderColor: '#cbb26a',

    },
    boxes: {
        height: Dimensions.get('window').width * 0.62,
        width: Dimensions.get('window').width * 0.90,
        margin: 20,
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: "#094f458f", //#451952ff
        borderRadius: 8,
        borderColor: "#cbb26a",
        borderWidth: 3,

    },
    square: {
        height: Dimensions.get('window').width * 0.40,
        width: Dimensions.get('window').width * 0.40,
        margin: 5,
        backgroundColor: '#094F44', //#178a62ff
        borderRadius: 8, //joo
        // borderWidth: 3,
        // borderColor: '#cbb26a',

    },
    square2: {
        height: Dimensions.get('window').width * 0.40,
        width: Dimensions.get('window').width * 0.40,
        margin: 5,
     
        backgroundColor: '#094F44',
        borderRadius: 8,
        // borderWidth: 3,
        // borderColor: '#cbb26a',

    },
   
    diagram: {
        flex: 2,
        padding: 10,
        marginBottom:20
    },
    pressablesContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 10,
    },
    pressableText: {
        textAlign: "center",
         color:"white",
         fontWeight:"500",
    },
    pressable: {
        borderColor: '#Cbb26a',
        borderWidth: 2,
        borderRadius: 8,
        height: Dimensions.get('window').width * 0.12,
        width: Dimensions.get('window').width * 0.22,
        justifyContent: "center",
    },
    pressableSelected: {
        backgroundColor: "#9315b9ff",

    },
    pressableNotSelected: {
        backgroundColor: "#094F44",
        
    },
    ckwhLoc: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    ckwh: {
        color: 'lightgray',
        fontSize:getFontSize(16),
        marginLeft:5,
        marginBottom:5
    },
    dateText: {
        color: 'lightgray',
        textAlign: "center",
        fontSize:getFontSize(18),
        marginTop:5

    },
});



const MainPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#1D1A39',
        justifyContent: "flex-start",
        alignItems: "stretch",

    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#1D1A39', //#094f44'
        padding: 10,
        borderBottomWidth: 2,
        borderColor: "#BE9E44", //#b38c1a
        //borderRadius: 5,
        justifyContent: 'space-evenly',
    },
    standInText: { 
        color: 'white',
        fontSize:getFontSize(18),
        fontWeight: '400',
    },
    carImage: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 3,

    },
    battery: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 4,
        padding: 20,

    },
    toggleButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 3,
        alignItems: "center",

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
        textShadowOffset: { width: 0, height: 1 }
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
    },
    lockTextStyle: {
        color: '#ffffff',
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 12,
        color: "#cbb26a"
    },
    powerTextStyle: {
        color: '#ffffff',
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 12,
        color: "#cbb26a"
    },
    acTextStyle: {
        color: '#ffffff',
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 12,
        color: "#cbb26a",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: 'rgba(6, 0, 46, 0.45)'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#cbb26a',
        borderRadius: 8,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    button: {
        borderRadius: 8,
        padding: 10,
        elevation: 4,
        marginTop: 5
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#1D1A39',
    },
    modalPressableText: {
        color: 'white',
        fontWeight: '400',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 17,
        textAlign: 'center',
    },

})

const ChargingMenuStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1A39',
        /* alignItems: 'center', */
        justifyContent: 'space-around'
    },

    chargingButton: { //en hoksaa mikä asetus määrittelee tämän buttonin "pieneksi"
        backgroundColor: '#094F44',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        margin: 20,
        borderColor:'#cbb26a',
        borderWidth: 2,

    },
    buttonText: {
        fontSize: 20,
        color: '#E5D9B6',
        //fontWeight: 'bold'
    },

    text: {
        color: 'white',
        margin: 10
    }
})

const chargingTableStyle = StyleSheet.create({
    tableContainer: {
      backgroundColor: '#e5d9b6d5',
      marginVertical: 10,
      padding: 5,
      margin: 20,
      borderRadius: 8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cell: {
      flex: 1,
      padding: 10,
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    value: {
      color: 'black',
    },
  })

export { HomeStyle, ProfileStyle, CharginStationsStyle, ePriceStyle, MainPageStyle, LogoAnimationStyle, ChargingMenuStyle, chargingTableStyle }