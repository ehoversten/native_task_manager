import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Welcome from './src/screens/Welcome';
import TaskList from './src/screens/TaskList';
import Detail from './src/screens/Detail';
import { FIREBASE_AUTH } from './FirebaseConfig';
import LeaderBoard from './src/screens/LeaderBoard';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Welcome: undefined;
  TaskList: undefined;
  InsideLayout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const InsideStack = createNativeStackNavigator<RootStackParamList>();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Welcome" component={Welcome}/>
      <InsideStack.Screen name="LeaderBoard" component={LeaderBoard}/>
      <InsideStack.Screen name="TaskList" component={TaskList}/>
      <InsideStack.Screen name="Detail" component={Detail}/>
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('User: ', user);
      setUser(user);
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        { user ? (
          <Stack.Screen 
            name='InsideLayout'
            component={InsideLayout}
            options={{
              headerShown: false
            }}/>
          ) : (
            <Stack.Screen 
              name='Login'
              component={Login}
              options={{
                title: "Login"
              }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
