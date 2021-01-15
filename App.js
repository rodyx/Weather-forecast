import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
import { Main } from './src/main/Main';
import { FetchWeatherData } from './src/main/api';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Popup } from './src/popup/Popup';

const Stack = createStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Popup"
          component={Popup} 
          options={{ headerShown: false }}
          />
        </Stack.Navigator>
      <StatusBar style="black" />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
  
// });
