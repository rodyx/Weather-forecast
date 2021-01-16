import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
} from "react-native";
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { windHeight, windWidth } from "../../size";

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
      <TouchableOpacity onPress={() => alert('edikl')}>
        <View style={styles.tile}>
          <Text style={styles.tileTime}>{8 + index * 7}:00</Text>
          <Feather name="sun" size={55} color="white" />
          <View style={styles.tileTempWrapper}>
            <Text style={styles.tileTemp}>{Math.round(weather.temp[['morn', 'eve', 'night'][index]])}</Text>
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
  tileTempWrapper: {
    flexDirection: 'row',
  },
  degree: {
    position: 'absolute', 
    top: 3, 
    left: windWidth / 11
  }
});