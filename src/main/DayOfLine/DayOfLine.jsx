import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDay } from '../../api/getDay';

const arr = [0, 1 , 2]

export const DayOfLine = (props) => {
  // const [stateButton, setActiveButton] = useState({ active: null })
  
  const currentItemWeather = props.index == 0 ? props.weather.current : props.weather.daily[props.index]
  
  return (
    <TouchableOpacity
      onPress={() => {
        props.buttonPressed()
        props.setWetIndex(props.index)
        props.setCurrentWeather(currentItemWeather)
        props.setActiveButton({ active: props.index })
      }}>
      <Text style={props.stateButton.active === props.index ? styles.btnActive : styles.dayLinetext}>{getDay(props.day)}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
})