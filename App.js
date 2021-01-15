import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
import { Main } from './src/main/Main';
import { FetchWeatherData } from './src/main/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const windWidth = Dimensions.get('window').width;
const windHeight = Dimensions.get('window').height;

export default function App() {
  let [fontsLoaded] = useFonts({
    'Hammersmith-One': require('./assets/fonts/HammersmithOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  // const [location, setLocation] = useState(null);
  // const [weather, setWeather] = useState({})
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       //setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});

  //     setLocation(location); 
  //   })();
  // }, []);

  // let text = 'Waiting..';

  // if (location) {
  //   text = JSON.stringify(location);

  //   // FetchWeatherData(location.coords.latitude,location.coords.longitude).then(setWeather);
  //   alert(text)
  // }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#6dfae5', '#72efed']}
        style={styles.background}
      />
      <Main />


      <StatusBar style="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windWidth,
    height: windHeight,
    paddingHorizontal: 25,
    paddingVertical: 75,
    justifyContent: 'flex-start',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: windHeight,
  },
});
