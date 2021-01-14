import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { useFonts, HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one';
import Piles from './Piles';
import Popup from './Popup';

export const BottomBar = () => {
  let [fontsLoaded] = useFonts({
    HammersmithOne_400Regular,
  });

  return (
    <View style={styles.container}>
      <View style={styles.dayLine}>
        <Text style={styles.dayLinetext}>Morning</Text>
        <Text style={styles.dayLinetext}>Afternoon</Text>
        <Text style={styles.dayLinetext}>Evening</Text>
      </View>
      <View style={styles.tileWrapper}>
        
        <TouchableOpacity onPress={() => alert('edikl')}>
          <View style={styles.tile}>
            <Text style={styles.tileTime}>7:00</Text>
            <Text><Feather name="sun" size={55} color="white" /></Text>
            <Text style={styles.tileTemp}>24°</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('edikl')}>
          <View style={styles.tile} onPress={() => alert('edikl')}>

            <Text style={styles.tileTime}>13:00</Text>
            <Text><Ionicons name="ios-rainy-outline" size={55} color="white" /></Text>
            <Text style={styles.tileTemp}>18°</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('edikl')}>
        <View style={styles.tile}>
          <Text style={styles.tileTime}>19:00</Text>
          <Text><Ionicons name="ios-cloudy-outline" size={55} color="white" /></Text>
          <Text style={styles.tileTemp}>21°</Text>
        </View>
        </TouchableOpacity>
      </View>

      <StatusBar style="gray" />
    </View>
     
  )
}

const windWidth = Dimensions.get('window').width;
const windHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windWidth-50,
    paddingVertical: 25,
    justifyContent: 'flex-start',
  },
  dayLine: {
    fontFamily: 'HammersmithOne_400Regular',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayLinetext: {
    fontFamily: 'HammersmithOne_400Regular',
    color: "#41406e",
  },
  tileWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tile: {
    width: windWidth / 3.7,
    height: windHeight / 5,
    backgroundColor: '#87d8fc',
    borderRadius: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tileTime: {
    fontFamily: 'HammersmithOne_400Regular',
    color: "gray",
  },
  tileTemp: {
    fontSize: 40,
    fontFamily: 'HammersmithOne_400Regular',
    color: "#41406e",
  }
});