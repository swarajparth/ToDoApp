import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


const ToDoItem = ({ toDoItem }) => {
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);

    const hideMenu = () => {
        setVisible(false);
        console.log("kebab menu being hidden");
    };

    const showMenu = () => {
        setVisible(true);
        console.log("kebab menu being shown");
    };

    const editToDoItem = () => {
        navigation.navigate("ToDoItemEditor", { toDoItem, createNewToDoItem: false });
        console.log("Edit To Do Item called: " + toDoItem.title);
        hideMenu();
    }

    const deleteToDoItem = () => {
        const _id = toDoItem._id;
        navigation.navigate("DeleteModal", { _id });
        console.log("Delete To Do Item called");
        hideMenu();
    }


    return (
        <Pressable
            className="flex flex-row items-center mx-5 my-2 p-2 bg-white border-2 rounded-xl"
            onPress={() => {
                navigation.navigate("ToDoItemDetails", { toDoItem });
            }}
        >
            <Text className="text-center text-3xl grow shrink" >
                {toDoItem.title}
            </Text>
            <View>
                <Menu
                    visible={visible}
                    anchor={
                        <Pressable
                            onPress={showMenu}
                        >
                            <Image className="w-5 h-5"
                                source={require('../../../assets/ellipsis.png')}
                            />
                        </Pressable>
                    }
                    onRequestClose={hideMenu}
                >
                    <MenuItem onPress={editToDoItem}>Edit</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={deleteToDoItem}>Delete</MenuItem>
                </Menu>
            </View>
        </Pressable>
    )
}

export default ToDoItem
