import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import Home from './src/Screens/Home';
import Print from './src/Screens/Print';
import AddNew from './src/Screens/AddNew';
import EditBill from './src/Screens/EditBill';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


export default function App() {
  const Stack = createStackNavigator();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white',
      accent: 'yellow',
    },
  };

  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false
      }} >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="add-new" component={AddNew} />
      <Stack.Screen name="edit-bill" component={EditBill} />
      <Stack.Screen name="print" component={Print} />
    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

