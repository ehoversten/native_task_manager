import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Detail({ route }) {
    const { task } = route.params;
    console.log("Selected Task: ", task)
  return (
    <View>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>{task.status}</Text>
      <Text>{task.created_at}</Text>
      <Text>{task.user_id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})