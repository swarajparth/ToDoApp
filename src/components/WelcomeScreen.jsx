import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import GlobalButton from './GlobalButton';
import ToDoList from './ToDoList';
import { useSelector } from 'react-redux';



const WelcomeScreen = ({ navigation }) => {
  const toDoItemsCount = useSelector((state) => state.toDo.count);

  return (
    <SafeAreaView>
      <View className="flex h-full justify-center">
        {toDoItemsCount === 0
          ?
          <View className="grow justify-center">
            <View className="flex items-center p-4">
              <Text className="text-xl text-center">
                Welcome to your To Do App.{'\n'}You have nothing to show.{'\n'}
              </Text>
            </View>
          </View>
          :
          <View className="flex-1">
            <ToDoList />
          </View>
        }
        <View>
          <GlobalButton
            title="Add Item"
            variation="round"
            handler={() => {
              navigation.navigate("ToDoItemEditor", {
                toDoItem: {
                  title: "",
                  description: ""
                },
                createNewToDoItem: true
              });
              console.log("Add Item Button called!");
            }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen
