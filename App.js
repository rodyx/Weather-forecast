import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { Main } from './src/main/Main';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Popup } from './src/popup/Popup';

const Stack = createStackNavigator();

export default function App() {
 let [fontsLoaded] = useFonts({
    'Hammersmith-One': require('./assets/fonts/HammersmithOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
 return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Popup"
          component={Popup} 
          options={{ headerShown: false }}
          />
        </Stack.Navigator>
      <StatusBar style="black" />
    </NavigationContainer>
  );
}


