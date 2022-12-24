import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';


export default function App() {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />      
    </NavigationContainer>        
  );
}
