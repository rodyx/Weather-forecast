import React, { useState, useEffect } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Dimensions, Image, Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ screenName }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container2}>
			<Text>
				<Ionicons name="ios-location-sharp" size={24} color="#41406e" />
				<Text style={styles.textCity}> Tashkent</Text>
			</Text>
			<Text>
				<TouchableOpacity onPress={() =>
					navigation.push('Popup', { name: 'Jane' })
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