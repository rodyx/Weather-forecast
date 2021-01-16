import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Animated, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { Header } from '../header/Header';
import { LinearGradient } from 'expo-linear-gradient';
import Cloud from '../../assets/weather-icons/cloud';
import { windHeight, windWidth } from '../../size';
import * as Location from 'expo-location';
import { FetchWeatherData } from './api';
import {Tile} from '../bottomBar/Tile';
import { Center } from './Center/Center';
import { getDay } from './api/getDay';

const tile1AnimVal = new Animated.Value(0)
const tile2AnimVal = new Animated.Value(0)
const tile3AnimVal = new Animated.Value(0)
const centerViewAnimVal = new Animated.Value(0)

export const Main = ({ navigation }) => {
  const [weather, setWeather] = useState()
  const [currentWeather, setCurrentWeather] = useState()
  const [wetIndex, setWetIndex] = useState(0)
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({});

        FetchWeatherData(location.coords.latitude, location.coords.longitude)
          .then(res => {
            setWeather(res)
            setCurrentWeather(res.current)
            buttonPressed();
          })
      }
    })();
  }, []);

  const buttonPressed = () => {
    tile1AnimVal.setValue(0);
    tile2AnimVal.setValue(0);
    tile3AnimVal.setValue(0);
    centerViewAnimVal.setValue(0);

    Animated.stagger(75, [
      Animated.timing(centerViewAnimVal, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(tile1AnimVal, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(tile2AnimVal, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(tile3AnimVal, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start()
  }
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6dfae5', '#72efed']}
        style={styles.background}
      />
      
      <Header screenName="Popup" weather={weather} />
      
      {currentWeather && <Center animationObj={centerViewAnimVal} weather={currentWeather} />}
      
      <View style={{ paddingVertical: 25 }}>
        
        <View style={styles.dayLine}>
          <TouchableOpacity 
            onPress={() => {
              buttonPressed()
              setWetIndex(0)
              setCurrentWeather(weather.current)
              }}>
            <Text style={styles.dayLinetext}>{getDay('today')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonPressed()
              setWetIndex(1)
              setCurrentWeather(weather.daily[1])
            }}>
            <Text style={styles.dayLinetext}>{getDay('tomorrow')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonPressed()
              setWetIndex(2)
              setCurrentWeather(weather.daily[2])
            }}>
            <Text style={styles.dayLinetext}>{getDay('after')}</Text>
          </TouchableOpacity>
        </View>
        
        {weather ? 
          
        (<View style={styles.tileWrapper}>
          {[tile1AnimVal, tile2AnimVal, tile3AnimVal].map((item, index) => {
            return (
            <Tile 
            animationObj={item} 
            key={index} 
            index={index}
            weather={weather.daily[wetIndex]} />
            )
          })}
        </View>) : (<View />)}
        
        
      </View>


      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    paddingVertical: 75,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '130%',
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  animContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    position: 'relative',
    left: windWidth,
  },
  textCity: {
    fontSize: 25,
    fontFamily: 'Hammersmith-One',
    color: '#41406e',
  },
  textWeatherCondition: {
    fontSize: 25,
    fontFamily: 'Hammersmith-One',
    color: '#41406e',
  },
  textWeatherTemp: {
    fontSize: 120,
    fontFamily: 'Hammersmith-One',
    color: '#41406e',
  },

  dayLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayLinetext: {
    fontFamily: 'Hammersmith-One',
    color: "#41406e",
  },
  tileWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: windHeight,
  },
  tile: {
    width: windWidth / 3.7,
    height: windHeight / 5,
    backgroundColor: '#95f6f5',
    borderRadius: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tileTime: {
    fontFamily: 'Hammersmith-One',
    color: "gray",
  },
  tileTemp: {
    fontSize: 40,
    fontFamily: 'Hammersmith-One',
    color: "#41406e",
  },
});