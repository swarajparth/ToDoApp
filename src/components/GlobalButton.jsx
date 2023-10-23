import React from 'react'
import { Button, Pressable, Text, View } from 'react-native'


const GlobalButton = ({ title, variation, handler }) => {
  return (
    <View className={(variation === "small" ? "items-center" : "")}>
      {
        variation === "round" ?
        <View className="flex items-center">
          <Pressable onPress={handler} className="h-12 w-12 bg-blue-700 rounded-full">
            <Text className="text-center text-white text-6xl">+</Text>
          </Pressable>
        </View> :

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










// import React from 'react';
// import {Alert, Pressable, Text, TextInput, View} from 'react-native';
// type ButtonSize = 'sm' | 'md' | 'lg';
// type ButtonShape = 'rd-box' | 'box' | 'rd';

// type Props = {
//   size: ButtonSize;
//   shape: ButtonShape;
//   border: number;
//   action: () => void;
//   text: string;
// };
// const GlobalButton = ({size, shape, border, action, text}: Props) => {
//   const shapeConfig = {};
//   return (
//     <View>
//       <Pressable
//         className={`border-${border} flex-row justify-center items-center rounded-[24px]`}
//         onPress={() => action()}>
//         <Text className={`text-${size}`}>{text}</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default GlobalButton;
