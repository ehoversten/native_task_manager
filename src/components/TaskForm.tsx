import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import uuid from 'react-native-uuid';


export default function TaskForm({ user }) {

  // console.log("Current User: ", user.currentUser);
  // console.log("User email: ", user.currentUser.email);
  // console.log("User ID: ", user.currentUser.uid);

    const [title, setTitle] = useState<String>("");
    const [description, setDescription] = useState<String>("");

    const addTask = async () => {
      const newTask = {
        id: uuid.v4(),
        title: title,
        description: description,
        status: false,
        created_at: Date.now(),
        completed_at: null,
        user_id: user.currentUser.uid
      }

      // console.log("New Task: ", newTask)

      const data = await addDoc(collection(FIRESTORE_DB, 'tasks'), newTask);
      // console.log("New: ", data);
      // Trigger Reminder 

      setTitle('');
      setDescription('');
    }

  return (
    <View style={styles.form}>
      <TextInput 
        value={title}
        style={styles.input} 
        placeholder="Enter Task Title" 
        onChangeText={(text: String) => setTitle(text)}/>
      <TextInput 
        value={description}
        style={styles.input} 
        placeholder="Enter Task Description" 
        // multiline
        // numberOfLines={4}
        // maxLength={40}
        onChangeText={(text: String) => setDescription(text)}/>
      <Button onPress={addTask} title="Add Task"/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {

    },
    form: {
      flexDirection: 'column',
      // alignItems: 'center'
      padding: 40
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderRadius: 4,
      padding: 20,
      backgroundColor: '#fff',
      margin: 10
    }
})