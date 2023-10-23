import React, { useEffect, useState } from 'react'
import { TextInput, ScrollView, View, Alert } from 'react-native'
import GlobalButton from './GlobalButton';
import { useToDo } from '../hooks/useToDo';

const ToDoItemEditor = ({ route, navigation }) => {
  const toDoItem = route.params.toDoItem;
  const createNewToDoItem = route.params.createNewToDoItem;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createToDoItem, editToDoItem } = useToDo();

  const handleSave = () => {
    if (title.trim() === "" && description.trim() === "") {
      Alert.alert("Both Title and Description can't be empty!");
      console.log("Both Title and Description can't be empty!");
    }
    else {
      if (createNewToDoItem) {
        createToDoItem(title, description);
      }
      else {
        editToDoItem(toDoItem._id, title, description);
      }
      navigation.goBack();
      console.log("Save button called in ToDoItemEditor");
      console.log("createNewToDoItem: " + createNewToDoItem);
    }
  }

  useEffect(() => {
    setTitle(toDoItem.title);
    setDescription(toDoItem.description);
    console.log("title: " + toDoItem.title);
    console.log("description: " + toDoItem.description);
    console.log("createNewToDoItem: " + createNewToDoItem)
  }, [route]);

  return (
    <ScrollView>
      <View className="min-h-[84vh]">
        <TextInput
          className="font-bold text-black m-2 py-3 text-center text-xl"
          editable
          multiline
          textAlign="center"
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          maxLength={30}
        />
        <TextInput
          className="m-2 text-justify text-xl"
          editable
          multiline
          textAlign="center"
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
        />
      </View>
      <View>
        <GlobalButton
          title="Save"
          variation="large"
          handler={handleSave} />
      </View>
    </ScrollView>
  )
}

export default ToDoItemEditor
