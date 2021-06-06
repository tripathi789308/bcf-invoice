import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomePage from './src/Screens/HomePage';
import Add from './src/Screens/Add';
import Print from './src/Screens/Print';


export default function App() {

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
       <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Add new +" component={Add} />
        <Drawer.Screen name="Print Bill" component={Print} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
