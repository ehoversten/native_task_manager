import { StyleSheet, Text, View, Button, ScrollView, FlatList, Pressable , SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, onSnapshot, deleteDoc, doc, getDocs } from "firebase/firestore"; 
import { onAuthStateChanged } from 'firebase/auth';
import TaskForm from '../components/TaskForm';

import { useNavigation } from '@react-navigation/native';

export default function TaskList({ route }) {
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;
    // console.log("Auth: ", auth)

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allTasks, setAllTasks] = useState([]);

    const handleDelete = async (taskId: String) => {
        console.log("Deleting ID: ", taskId);
        console.log("Tasks: ", tasks)
        // const filteredTasks = tasks.filter(task => task.id !== taskId)
        // console.log("Filtered: ", filteredTasks);
        // const docRef = doc(FIRESTORE_DB, 'tasks', taskId)
        const docRef = doc(FIRESTORE_DB, 'native-tasks', taskId)
        const response = await deleteDoc(docRef);
        console.log("Res: ", response);
        // route = undefined
        // setTasks(filteredTasks);
    }   

    // if(!route.params) {
    //     console.log("PArams: ", route.params)
    // } else {
    //     handleDelete(route.params)
    // }

    useEffect(() => {
        const tasksRef = collection(FIRESTORE_DB, 'tasks');
        const nativeRef = collection(FIRESTORE_DB, 'native-tasks');
        // console.log("Data: ", tasksRef);
        
        const subscriber = onSnapshot(nativeRef, (snapshot) => {
            setLoading(true);
            console.log("Snapshot: ", snapshot);
            console.log("Data: ", snapshot.docs);
            let currentTasks: any[] = [];
            snapshot.docs.map((doc) => { 
                // console.log("Doc: ", doc);
                console.log("Data: ", doc.data());
                console.log("Data ID: ", doc.id);
                currentTasks.push({ 
                    id: doc.id,
                    ...doc.data()
                })
            })
            console.log("Tasks: ", currentTasks);
            setTasks(currentTasks);
            setLoading(false);
        })

        return () => subscriber();
    }, []);



    return (
        <SafeAreaView>

            <View>
                <TaskForm user={auth}/>
                <FlatList 
                    data={tasks}
                    renderItem={({ item }) => (
                        <Pressable style={styles.card} onPress={() => navigation.navigate('Detail', { task: item })}>
                            <Text>{item.title}</Text>
                            <Text>{item.description}</Text>
                            { item.status == true ? (
                                <Text>Task Completed</Text>
                                ) : (
                                <Text>Task In Progress</Text>
                            )}
                            <Text>{item.user_id}</Text>
                        </Pressable>
                    )}
                    ItemSeparatorComponent={<View style={{ height: 15 }}/>}
                    ListEmptyComponent={(
                        <View>
                            <Text>No Tasks</Text>
                        </View>
                    )}
                    />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        // margin: 10,
        marginHorizontal: 20,
        backgroundColor: "#b3b3b3"
    }
})