import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Animated, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { Popup } from '../popup/Popup';

const box1AnimationValue = new Animated.Value(0)
const box2AnimationValue = new Animated.Value(0)
const box3AnimationValue = new Animated.Value(0)
const box4AnimationValue = new Animated.Value(0)
const windWidth = Dimensions.get('window').width;
const windHeight = Dimensions.get('window').height;

export const Main = ({ weather }) => {
  useEffect(() => {
    buttonPressed();
  }, [])

  const buttonPressed = () => {
    box1AnimationValue.setValue(0);
    box2AnimationValue.setValue(0);
    box3AnimationValue.setValue(0);
    box4AnimationValue.setValue(0)

    Animated.stagger(75, [
      Animated.timing(box4AnimationValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(box1AnimationValue, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(box2AnimationValue, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(box3AnimationValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start()
  }

  
  return (
    <View style={styles.container}>
      <Popup></Popup>
      
      
      <View style={styles.centerContainer}>
      <Animated.View style={{
        ...styles.animContainer,
        transform: [
          {
            translateX: box4AnimationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, +`${windWidth * -1}`],
            }),
          }
        ],
      }}>
        <Image style={styles.weatherIcon} source={require('../../assets/weather-icons/thunderstorm.png')} />
          <Text style={styles.textWeatherCondition}>Cloudy</Text>
          <Text style={styles.textWeatherTemp}> 28°</Text>
          <View>
            <Text style={{color: '#41406e'}}><MaterialCommunityIcons name="weather-windy" size={16} color="#41406e" /> 8 km/h  <SimpleLineIcons name="drop" size={16} color="#41406e" /> 47 %</Text>
          </View>
      </Animated.View>
      </View>
      
      <View style={{ paddingVertical: 25, }}>
        <View style={styles.dayLine}>
          <TouchableOpacity onPress={buttonPressed}>
            <Text style={styles.dayLinetext}>Morning</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={buttonPressed}>
            <Text style={styles.dayLinetext}>Afternoon</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={buttonPressed}>
            <Text style={styles.dayLinetext}>Evening</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tileWrapper}>


          <Animated.View style={{
            transform: [
              {
                translateY: box1AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, +`${windHeight * -0.78}`],
                }),
              }
            ],
          }}>
            <TouchableOpacity onPress={() => alert('edikl')}>
              <View style={styles.tile}>
                <Text style={styles.tileTime}>19:00</Text>
                <Text><Feather name="sun" size={55} color="white" /></Text>
                <Text style={styles.tileTemp}>21°</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{
            transform: [
              {
                translateY: box2AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, +`${windHeight * -0.78}`],
                }),
              }
            ],
          }}>
            <TouchableOpacity onPress={() => alert('222edikl')}>
              <View style={styles.tile}>
                <Text style={styles.tileTime}>13:00</Text>
                <Text><Ionicons name="ios-rainy-outline" size={55} color="white" /></Text>
                <Text style={styles.tileTemp}>18°</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{
            transform: [
              {
                translateY: box3AnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, +`${windHeight * -0.78}`],
                }),
              }
            ],
          }}>
            <TouchableOpacity onPress={() => alert('edikl')}>
              <View style={styles.tile}>
                <Text style={styles.tileTime}>19:00</Text>
                <Text><Ionicons name="ios-cloudy-outline" size={55} color="white" /></Text>
                <Text style={styles.tileTemp}>21°</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

        </View>
        <StatusBar style="gray" />
      </View>


      <StatusBar style="auto" />
    </View>
  )
}

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