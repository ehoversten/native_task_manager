import { StyleSheet, Switch, Text, View, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc, onSnapshot, updateDoc, collection } from "firebase/firestore"; 
import { FIRESTORE_DB } from '../../FirebaseConfig';

export default function Detail({ route }) {

  const navigation = useNavigation()

    const { task } = route.params;
    // console.log("Selected Task: ", task)
    
    const handleUpdate = async (taskId: String) => {
      // console.log("Updating ID: ", taskId);
      const docRef = doc(FIRESTORE_DB, 'native-tasks', taskId);
      try {
        await updateDoc(docRef, { status: true, completed_at: Date.now() })
        console.log('UPDATED DOCUMENT');

        navigation.navigate('TaskList');
      } catch (error) {
        
        console.log("Error: ", error)
      }
    }
    
    const handleDelete = async (taskId: String) => {
      console.log("Deleting ID: ", taskId);
      const docRef = doc(FIRESTORE_DB, 'native-tasks', taskId);

      try {
        const delData = await deleteDoc(docRef);
        console.log("Delete Reponse: ", delData)
        navigation.navigate("TaskList");
      } catch (error) {
        console.log("Error: ", error)
      }

    }

  return (
    <View style={[styles.container, styles.card]}>
      <Text style={styles.title}>{task.title}</Text>
      <Text >{task.id}</Text>
      <Text>{task.description}</Text>
      { task.status == true ? (
        <Text>Task Completed</Text>
        ) : (
        <Text>Task In Progress</Text>
      )}
      <View style={styles.switchContainer}>
        <Text>Task Completed:</Text>
        <TouchableOpacity onPress={() => handleUpdate(task.id)}>
          <Text>Mark Complete</Text>
        </TouchableOpacity>
      </View>
      <Text>{task.created_at}</Text>
      <Text>{task.user_id}</Text>
      <Button
        title='Delete Task'
        onPress={() => handleDelete(task.id)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    // margin: 10,
    marginHorizontal: 20,
    backgroundColor: "#b3b3b3"
  }, 
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10 
  },
  delete: {
    borderBlockColor: 'midnight',
    borderColor: 'green',
    borderRadius: 4
  }
})