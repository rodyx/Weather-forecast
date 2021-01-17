import React, { useState, useEffect } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Dimensions, Image, Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ weather, setReset, reset, setWeather, setCurWet }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container2}>
      <TouchableOpacity onPress={() => {
        setWeather()
        setCurWet()
        setReset(!reset)
        }}>
        <Text>
          <Ionicons name="ios-location-sharp" size={24} color="#41406e" />
          <Text style={styles.textCity}> {weather.timezone.split("/")[1] || weather.timezone}</Text>
        </Text>
      </TouchableOpacity>
      <Text>
        <TouchableOpacity onPress={() =>
          navigation.push('Popup', { weather: weather })
        }>
          <Feather name="calendar" size={24} color="#41406e" />
        </TouchableOpacity>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container2: {
    justifyContent: "space-between",
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 50,
    width: 'auto',
  },
  textCity: {
    fontSize: 25,
    fontFamily: 'Hammersmith-One',
    color: '#41406e',
  },
})