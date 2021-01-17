import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import { windHeight, windWidth } from '../../size';
import { daysOfWeek, dateNow } from '../api/getDay';
import { IoniconsMap, IoniconsMapColors } from '../../assets/weather-icons/Ionicons/IoniconsMap';

export const Popup = ({ route, navigation: { goBack } }) => {
  const { weather } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', left: 0 }}>
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={{ ...styles.text, fontSize: 25, color: 'white' }}>{weather.timezone.split("/")[1] || weather.timezone}</Text>
      </View>
      
      <View style={styles.wrapperWeather}>
        <View style={styles.messagesWeather}>
          <View style={styles.message}>
            <View style={styles.messageWeatherIcon}>
              <Image style={{ width: 120, height: 120 }} source={require('../../assets/weather-icons/sun_and_clouds.png')} />
            </View>
            <View style={{ flex: 2, justifyContent: 'flex-end' }}>
              <Text style={{ ...styles.text, fontSize: 14, color: '#6b6d76' }}>
                10 minutes ago
              </Text>
            </View>

            <View style={{ flex: 3 }}>
              <Text style={{ ...styles.text, marginTop: 10 }}>
                Dangerous sun! Take care of yourself and take advantage of UV protection
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.weekTempWeather}>
          <Text style={{ ...styles.text, fontSize: 22, color: 'white' }}>Next Days</Text>

          {daysOfWeek.map((elem, ind, array) => {
            let day = Date.now() + 86400 * 1000 * (ind + 1);
            
            return (
              <View key={ind} style={styles.dayWrapper}>
                <Text style={{ ...styles.text, flex: 5 }}>{array[new Date(day).getDay()]}</Text>
                <View style={styles.dayTempWrapper}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={styles.text}>{Math.round(weather.daily[ind + 1].temp.min)}°</Text>
                    <Text style={{ ...styles.text, marginLeft: 15, color: '#6b6d76' }}>{Math.round(weather.daily[ind + 1].temp.max)}°</Text>
                  </View>

                  <Ionicons name={IoniconsMap.get(weather.daily[ind + 1].weather[0].main)} 
                            size={30} 
                            color={IoniconsMapColors.get(weather.daily[ind + 1].weather[0].main)} />
                </View>

              </View>
            )

          })}

        </View>
      </View>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#232634',
    paddingHorizontal: windWidth / 16,
    paddingVertical: windHeight / 16,
  },
  text: {
    fontFamily: 'Hammersmith-One',
    color: '#babbbf',
    fontSize: 16,
  },
  wrapperWeather: {
    flex: 1,
  },
  messagesWeather: {
    flex: 3,
  },
  message: {
    marginVertical: 50,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2b303e',
    borderRadius: 15,
  },
  messageWeatherIcon: {
    position: 'absolute',
    top: -50,
    right: 25,
  },
  weekTempWeather: {
    flex: 5,
    justifyContent: 'space-between',
  },
  dayWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  dayTempWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 6,
    alignItems: 'baseline',
  }
})