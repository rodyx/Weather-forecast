import React, { useState, useEffect } from 'react';
import { Dimensions, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View, Animated, Button, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { useFonts, HammersmithOne_400Regular } from '@expo-google-fonts/hammersmith-one';
import Piles from './Piles';
import Popup from './Popup';


const windWidth = Dimensions.get('window').width;
const windHeight = Dimensions.get('window').height;
let k = [0, -300];

export const BottomBar = () => {
  const box1AnimationValue = React.useRef(new Animated.Value(0)).current;
  const box2AnimationValue = React.useRef(new Animated.Value(0)).current;
  const box3AnimationValue = React.useRef(new Animated.Value(0)).current;

  const buttonPressed = () => {
    Animated.stagger(150, [
      Animated.timing(box1AnimationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(box2AnimationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(box3AnimationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

    ]).start()
  }

  let k = windHeight * 0.5;
  const test = () => {
    box1AnimationValue.setValue(0);
    box2AnimationValue.setValue(0);
    box3AnimationValue.setValue(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.dayLine}>
        <TouchableOpacity onPress={buttonPressed}>
          <Text style={styles.dayLinetext}>Morning</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={buttonPressed}>
          <Text style={styles.dayLinetext}>Afternoon</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={test}>
          <Text style={styles.dayLinetext}>Evening</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tileWrapper}>
        
        
        <Animated.View style={{
          transform: [
            {
              translateY: box1AnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -700],
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
                outputRange: [0, -700],
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
                outputRange: [0, -700],
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
     
  )
}


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
    alignItems: 'flex-end',
    height: windHeight,
    
  },
  tile: {
    width: windWidth / 3.7,
    height: windHeight / 5,
    backgroundColor: '#88d9fc',
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
  },
});