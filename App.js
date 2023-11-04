
import { StyleSheet, Text, View, ImageBackground, Pressable, Button } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.text3}>Volterra Electric Vehicle App</Text>
      <Text style={styles.text}>Ilia</Text>
      <Text style={styles.text}>Tomi Valtanen</Text>
      <Text style={styles.text}>Jenny Kari</Text>
      <Text style={styles.text}>Jere Pihlajasaari</Text>
      <Text></Text>
      <Pressable style={styles.pressableButton}>
        <Text style={styles.text}>START/STOP ENGINE</Text>
      </Pressable>
      <Text></Text>
      <Pressable style={styles.pressableButton2}>
        <Text style={styles.text2}>LOGIN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1A39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#E5D9B6',
  },
  pressableButton: {
    backgroundColor: '#451952',
    width: 200,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10
  },
  pressableButton2: {
    backgroundColor: '#BE9E44',
    width: 200,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10
  },
  text2: {
    color: '#000000'
  },
  text3: {
    color: '#CBB26A'
  }
});
