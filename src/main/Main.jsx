import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one';
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { BottomBar } from '../bottomBar/BottomBar';

export const Main = ({ weather }) => {
  
  let [fontsLoaded] = useFonts({
    HammersmithOne_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text>
          <Ionicons name="ios-location-sharp" size={24} color="#41406e"/> <Text style={styles.textCity}> Tashkent</Text>
        </Text>
      </View>
      <View style={styles.centerContainer}>
        <Image style={styles.weatherIcon} source={require('../../assets/weather-icons/thunderstorm.png')} />
          <Text style={styles.textWeatherCondition}>Cloudy</Text>
          <Text style={styles.textWeatherTemp}> 28°</Text>
          <View>
            <Text style={{color: '#41406e'}}><MaterialCommunityIcons name="weather-windy" size={16} color="#41406e" /> 8 km/h  <SimpleLineIcons name="drop" size={16} color="#41406e" /> 47 %</Text>
          </View>
      </View>
      <BottomBar></BottomBar>
      <StatusBar style="auto" />
    </View>
  )
}

const windWidth = Dimensions.get('window').width;
const windHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 5,
    justifyContent: 'flex-start',
  },
  container2: {
    justifyContent: "flex-start",
    height: 50,
    width: 200,
  },
  weatherIcon: {
    width: 220,
    height: 220,
  },
  centerContainer: {
    height: windHeight * 0.5,
    paddingHorizontal: 25,
    paddingVertical: 25,
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textCity: {
    fontSize: 25,
    fontFamily: 'HammersmithOne_400Regular',
    color: '#41406e',
  },
  textWeatherCondition: {
    fontSize: 25,
    fontFamily: 'HammersmithOne_400Regular',
    color: '#41406e',
  },
  textWeatherTemp: {
    fontSize: 120,
    fontFamily: 'HammersmithOne_400Regular',
    color: '#41406e',
  },
});