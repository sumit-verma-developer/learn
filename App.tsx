import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store, {RootState} from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import EditName from './src/screens/EditName';
import AddEditTask from './src/screens/AddEditTask';

const Stack = createNativeStackNavigator()
const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerTitle: 'Home Screen'}} component={HomeScreen} name="HomeScreen" />
            <Stack.Screen options={{headerTitle: 'Add Edit Name'}} component={EditName} name="EditNameScreen" />
            <Stack.Screen options={{headerTitle: 'Add Edit Task'}} component={AddEditTask} name="AddEditTask" />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
