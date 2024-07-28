import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Button } from 'react-native';


import { useFonts } from 'expo-font';

import Login from './Page/Login'
import Maps from './Page/Maps'
import Driver_wait from './Page/Driver_wait'

// Buat stack navigator
const Stack = createStackNavigator();

function App() {

  // const [fontsLoaded] = useFonts({
  //   'poppins': require('./assets/poppins.ttf'), // Ganti dengan path font Anda
  // });
  // if (!fontsLoaded) {
  //     console.log('Font tidak terload');
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={ { headerShown : false } }>
        <Stack.Screen name="Login"  component={Login} />
        <Stack.Screen name="Maps"  component={Maps} />
        <Stack.Screen name="Driver_wait"  component={Driver_wait} />
        {/* <Stack.Screen name="Maps_ride"  component={Maps_ride} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
