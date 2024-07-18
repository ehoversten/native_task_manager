import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import uuid from 'react-native-uuid';


export default function TaskForm({ user }) {

    const [title, setTitle] = useState<String>("");
    const [description, setDescription] = useState<String>("");

    const addTask = async () => {

    try {
      const newTask = {
        // task_id: uuid.v4(),
        title: title,
        description: description,
        status: false,
        created_at: Date.now(),
        completed_at: null,
        user_id: user.currentUser.uid
      }
      
      const collectionRef = collection(FIRESTORE_DB, 'native-tasks');
      // console.log("Collection Ref: ", collectionRef)

      const data = await addDoc(collectionRef, newTask)
      // console.log("New: ", data);
      // console.log("New: ", data.id);

      // Trigger Reminder 

      setTitle('');
      setDescription('');
    } catch (error) {
      console.log("Error New Task: ", error)
    }

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
        onChangeText={(text: String) => setDescription(text)}/>
      <Button onPress={addTask} title="Add Task" disabled={ title == "" || description == ""}/>
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
    },
    multiline: {
      minHeight: 100
    }
})