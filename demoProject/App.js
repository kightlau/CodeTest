import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import axios from 'axios';
import 'react-native-gesture-handler'
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';
import RecordsForm from './components/RecordsForm';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="RecordsForm" component={RecordsForm} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
