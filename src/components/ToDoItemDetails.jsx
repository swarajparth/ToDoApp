import React from 'react'
import { Text, ScrollView } from 'react-native'

const ToDoItemDetails = ({ route }) => {
  const toDoItem = route.params.toDoItem;

  return (
    <ScrollView>
      <Text className="font-bold text-black m-2 py-3 text-center text-xl">
        {toDoItem.title}
      </Text>
      <Text className="m-2 text-center text-xl">
        {toDoItem.description}
      </Text>
    </ScrollView>
  )
}

export default ToDoItemDetails
