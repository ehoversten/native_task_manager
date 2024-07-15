import { StyleSheet, Text, View, Button, ScrollView, FlatList, Pressable , SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, onSnapshot } from "firebase/firestore"; 
import { onAuthStateChanged } from 'firebase/auth';
import TaskForm from '../components/TaskForm';

import { useNavigation } from '@react-navigation/native';

export default function TaskList() {
    const navigation = useNavigation();

    const auth = FIREBASE_AUTH;
    // console.log("Auth: ", auth)

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentTask, setCurrentTask] = useState({})

    useEffect(() => {
        setLoading(true);
        const tasksData = collection(FIRESTORE_DB, 'tasks');
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

    const viewDetails = (item) => {
        console.log("Task ID: ", item.id);
        navigation.navigate("Detail", { task: item });
    }

    return (
        <SafeAreaView>

            <View>
                <TaskForm user={auth}/>
                <FlatList 
                    data={tasks}
                    renderItem={({ item }) => (
                        <Pressable style={styles.card} onPress={viewDetails(item)}>
                            <Text>{item.title}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.status}</Text>
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