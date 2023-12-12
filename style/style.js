import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import Constants from "expo-constants";

const CharginStationsStyle = StyleSheet.create({
    container: {
        container: {
            /* paddingTop: Constants.statusBarHeight, */
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
        justifyContent: 'space-around',
        padding: 20,
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
        fontSize: 18,
        textAlign: 'center',
        color: '#000000'
    },
    text: {
        color: '#cbb26a',
        fontSize: 20,

    },
    loginButton: { //en hoksaa mikä asetus määrittelee tämän buttonin "pieneksi"
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
        width: "40%",
        color: '#E5D9B6',
        marginBottom: 2,
        fontSize: 15
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
        flex:1
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
    // header: {
    //     flexDirection: 'row',
    //     backgroundColor: '#22203a',
    //     padding: 10,
    //     borderBottomWidth: 2,
    //     borderColor: "#BE9E44", //#b38c1a
    //     //borderRadius: 5,
    //     justifyContent: 'space-evenly',
    //     paddingTop: 50
    // },
    container2: {
        //backgroundColor: '#094F44',
        //row: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    headline: {
        fontSize: 30,
        color: '#E5D9B6',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    headline2: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        marginTop: 20,
        color: '#E5D9B6',
        fontWeight: 'bold',
    },
    headline3: {
        fontSize: 26,
        textAlign: 'center',
        margin: 5,
        marginBottom: 15,
        color: '#E5D9B6',
    },
    headline5: {
        fontSize: 22,
        textAlign: 'center',
        //margin: 1,
        marginBottom: 5,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    button: {

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
    container3: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bghourprice2: {
        //väritestejä
        //backgroundColor: '#1ED1B1',
        //borderRadius: 20,
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.4,
        backgroundColor: '#094F44',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        borderWidth: 3,
        borderColor: '#cbb26a',
    }, boxes: {
        margin: 20,
        marginTop: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth:1,
        backgroundColor:"#451952ff"

    }, square: {
        height: Dimensions.get('window').width * 0.40,
        width: Dimensions.get('window').width * 0.45,
        margin: 5,
        backgroundColor: '#094F44',
        borderRadius: 8, //joo
        borderWidth: 3,
        borderColor: '#cbb26a',

    }, square2: {
        height: Dimensions.get('window').width * 0.40,
        width: Dimensions.get('window').width * 0.45,
        margin: 5,
        backgroundColor: '#094F44',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#cbb26a',

    }, headline4: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
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
        backgroundColor: "#33cc7f",
      },
      pressableNotSelected: {
        backgroundColor: "#094F44",
      },
    });



const MainPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        backgroundColor: '#1D1A39',
        justifyContent:"flex-start",
        alignItems:"stretch",

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
    },
    carImage: {
        justifyContent:"center",
        alignItems: 'center',
        flex:3,
      
    },
    battery: {
        justifyContent:"center",
        alignItems: 'center',
        flex:4,
        padding:20,
       
    },
    toggleButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex:3,
        alignItems:"center",
       
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
        color: "#cbb26a"
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
        borderRadius: 15,
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
        borderRadius: 15,
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

const ChargingMenuStyle = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#1D1A39',
        /* alignItems: 'center', */
        justifyContent: 'space-around'
    },

    chargingButton: { //en hoksaa mikä asetus määrittelee tämän buttonin "pieneksi"
        backgroundColor: '#81cb6a',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        margin: 20,

    },
    buttonText: {
        fontSize: 20,
        color: '#1a1a1a',
        //fontWeight: 'bold'
    },

    text: {
        color: 'white',
        margin: 10
    }
})

export { HomeStyle, ProfileStyle, CharginStationsStyle, ePriceStyle, MainPageStyle, LogoAnimationStyle, ChargingMenuStyle }