import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, onSnapshot } from "firebase/firestore"; 
import { onAuthStateChanged } from 'firebase/auth';
import TaskForm from '../components/TaskForm';

export default function TaskList() {

    const auth = FIREBASE_AUTH;
    // console.log("Auth: ", auth)

    // onAuthStateChanged(FIREBASE_AUTH, (user) => {
    //     if(user) {
    //         console.log("user: ", user)
    //     } else {

    //     }
    // })

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const tasksData = collection(FIRESTORE_DB, 'tasks')
        console.log("Data: ", tasksData);

        const subscriber = onSnapshot(tasksData, (snapshot) => {
            let currentTasks = [];
            snapshot.docs.map((doc) => { 
                // console.log("Doc: ", doc);
                // console.log("Data: ", doc.data());
                currentTasks.push(doc.data())
            })
            console.log("Tasks: ", currentTasks);
            setTasks(currentTasks);
            setLoading(false);
        })

        return () => subscriber();
    }, [])

    return (
        <View>
            <TaskForm user={auth}/>
            { tasks.map(task => (
                <View key={task.id} style={styles.card}>
                    <Text>{task.title}</Text>
                    <Text>{task.description}</Text>
                    <Text>{task.status}</Text>
                    <Text>{task.user_id}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        margin: 8,
        backgroundColor: "#bbb"
    }
})