import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, View, ActivityIndicator} from 'react-native';
import { Header } from '../header/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { windHeight, windWidth} from '../../size';
import * as Location from 'expo-location';
import { FetchWeatherData } from '../api';
import {Tile} from '../bottomBar/Tile';
import { Center } from './Center/Center';
import { DayOfLine } from './DayOfLine/DayOfLine';

const tile1AnimVal = new Animated.Value(0)
const tile2AnimVal = new Animated.Value(0)
const tile3AnimVal = new Animated.Value(0)
const centerViewAnimVal = new Animated.Value(0)

export const Main = () => {
  const [reset, setReset] = useState(false)
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
          .catch(() => alert('Check your internet connection'))
      }
    })();
  }, [reset]);

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
        colors={['#5ae4fe', '#5acbfa']}
        style={styles.background}
      />

      {!weather && <ActivityIndicator size="large" color="white" style={styles.activityInd}/>}
      
      {weather && <Header
        screenName="Popup"
        weather={weather}
        setReset={setReset}
        reset={reset}
        setWeather={setWeather}
        setCurWet={setCurrentWeather} />}
      
      {currentWeather && <Center animationObj={centerViewAnimVal} weather={currentWeather} />}
      
      <View style={{ paddingVertical: 25 }}>
        
        {weather && <View style={styles.daysLine}>
          {['today', 'tomorrow','after'].map((item, index) => {
            return <DayOfLine
              buttonPressed={buttonPressed}
              setWetIndex={setWetIndex}
              setCurrentWeather={setCurrentWeather}
              weather={weather}
              stateButton={stateButton}
              setActiveButton={setActiveButton}
              day={item}
              index={index} 
              key={index}    
                            />
          })}

        </View>}
        
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
  activityInd: {
    position: 'relative',
    left: windWidth * 0.01,
    transform: [
      { translateY: windHeight * 0.3 },
    ],
  },
  daysLine: {
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

