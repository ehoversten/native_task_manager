import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>

export default function Welcome({navigation}: WelcomeProps) {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Button 
        title='Go to Leader Board'
        onPress={() => navigation.navigate('LeaderBoard')}
        />
      <Button 
        title='Task List'
        onPress={() => navigation.navigate('TaskList')} />
      <Button 
        title='Logout'
        onPress={() => FIREBASE_AUTH.signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})