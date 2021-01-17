import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { windHeight, windWidth } from "../../size";
import { IoniconsMap } from "../../assets/weather-icons/Ionicons/IoniconsMap";

export const Tile = ({ animationObj, index, weather}) => {
  return (
    <Animated.View style={{
      transform: [
        {
          translateY: animationObj.interpolate({
            inputRange: [0, 1],
            outputRange: [0, +`${windHeight * -0.78}`],
          }),
        }
      ],
    }}>
      <TouchableOpacity>
        <View style={styles.tile}>
          <Text style={styles.tileTime}>{9 + index * 6}:00</Text>
          <Ionicons name={IoniconsMap.get(weather.weather[0].main)} size={55} color="white" />
          <View style={styles.tileTempWrapper}>
            <Text style={styles.tileTemp}>{Math.round(weather.temp[['morn', 'max', 'night'][index]])}</Text>
            <View style={styles.degree}><Text style={{ fontSize: 25, color: "#41406e"}}>°</Text></View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  tile: {
    width: windWidth / 3.7,
    height: windHeight / 5,
    backgroundColor: '#95dfff',
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
  tileTempWrapper: {
    flexDirection: 'row',
  },
  degree: {
    position: 'relative', 
    top: 2,
    left: 2
  }
});