import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Animated, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { Header } from '../header/Header';
import { LinearGradient } from 'expo-linear-gradient';
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

export const Main = () => {
  const [weather, setWeather] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [wetIndex, setWetIndex] = useState(0);
  const [stateButton, setActiveButton] = useState({ active: null })
  
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
      
      {weather && <Header screenName="Popup" weather={weather} />}
      
      {currentWeather && <Center animationObj={centerViewAnimVal} weather={currentWeather} />}
      
      <View style={{ paddingVertical: 25 }}>
        
        <View style={styles.dayLine}>
          <TouchableOpacity 
            onPress={() => {
              buttonPressed()
              setWetIndex(0)
              setCurrentWeather(weather.current)
              setActiveButton({ active: 0 })
              }}>
            <Text style={stateButton.active === 0 ? styles.btnActive : styles.dayLinetext}>{getDay('today')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonPressed()
              setWetIndex(1)
              setCurrentWeather(weather.daily[1])
              setActiveButton({ active: 1 })
              }}
            >
            <Text style={stateButton.active === 1 ? styles.btnActive : styles.dayLinetext}>{getDay('tomorrow')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buttonPressed()
              setWetIndex(2)
              setCurrentWeather(weather.daily[2])
              setActiveButton({ active: 2 })
            }}>
            <Text style={stateButton.active === 2 ? styles.btnActive : styles.dayLinetext}>{getDay('after')}</Text>
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
  dayLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnActive: {
    fontFamily: 'Hammersmith-One',
    color: "#41406e",
    opacity: 1,
  },
  dayLinetext: {
    fontFamily: 'Hammersmith-One',
    color: "#41406e",
    opacity: 0.4,
  },
  tileWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: windHeight,
  },
  
});