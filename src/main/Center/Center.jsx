import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
} from "react-native";
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { windHeight, windWidth } from "../../../size";

export const Center = ({ animationObj, weather }) => {
  return (
    <View style={styles.centerContainer}>
      <Animated.View style={{
        ...styles.animContainer,
        transform: [
          {
            translateX: animationObj.interpolate({
              inputRange: [0, 1],
              outputRange: [0, +`${windWidth * -1}`],
            }),
          }
        ],
      }}>

        <Image style={{ width: 200, height: 200 }} source={require('../../../assets/weather-icons/Clear.png')} />
        <Text style={{ ...styles.textCenter, fontSize: 25, marginTop: 10}}>{weather.weather[0].main}</Text>
        <View style={{ flexDirection: 'row'}}>
          <Text style={{ ...styles.textCenter, fontSize: 120 }}>{Math.round(weather?.temp) || Math.round(weather?.temp.day)}</Text>
          <View style={styles.degree}><Text style={{ fontSize: 60, color: "#41406e" }}>°</Text></View>
        </View>
        
        <View style={styles.smallBox}>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons name="weather-windy" size={16} color="#41406e" />
            <Text style={{ ...styles.textCenter, marginLeft: 8 }}>{weather.wind_speed} km/h</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <SimpleLineIcons name="drop" size={16} color="#41406e" />
            <Text style={{ ...styles.textCenter, marginLeft: 8 }}>{weather.humidity} %</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  smallBox: {
    flexDirection: 'row',
    width: windHeight / 5,
    justifyContent: "space-between",
  },
  textCenter: {
    fontFamily: 'Hammersmith-One',
    color: '#41406e',
  },
  degree: {
    position: "relative",
    top: 10,
    left: 5,
  }
});