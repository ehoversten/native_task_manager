import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

export default function Login({navigation}: LoginProps ) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Auth: ", response);
    } catch (error: any) {
      console.log("Error: ", error);
      alert('Sign in failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Auth: ", response);
    } catch (error: any) {
      console.log("Error: ", error);
      alert('Registration failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Please Login</Text>
      <TextInput 
        value={email} 
        style={styles.input} 
        placeholder='Enter Email' 
        autoCapitalize='none'
        onChangeText={(txt) => setEmail(txt)}/>
      <TextInput 
        value={password} 
        style={styles.input} 
        placeholder='Enter Password' 
        autoCapitalize='none'
        secureTextEntry={true}
        onChangeText={(txt) => setPassword(txt)}/>
      <Button 
        title='Login'
        onPress={signIn}
        />
      <Button 
        title='Register'
        onPress={signUp}
        />
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
  input: {
    marginVertical: 4,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  }
});
