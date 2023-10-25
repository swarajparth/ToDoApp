import React from 'react'
import { Button, Pressable, Text, View } from 'react-native'


const GlobalButton = ({ title, variation, handler }) => {
  return (
    <View className={(variation === "small" ? "items-center" : "")}>
      {
        variation === "round" ?
          <View className="flex items-center">
            <Pressable onPress={handler} className="h-12 w-12 m-2 bg-blue-700 rounded-full">
              <Text className="text-center text-white text-6xl">+</Text>
            </Pressable>
          </View>
          :
          <Button
            onPress={handler}
            title={title}
            color="rgb(29 78 216)"
          />
      }
    </View>
  )
}

export default GlobalButton