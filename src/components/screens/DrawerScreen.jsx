import React, { useEffect } from 'react';
import { Text } from 'react-native'
import WelcomeScreen from './WelcomeScreen';
import { useAuth } from '../../hooks/useAuth';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import ToDoItemDetails from './ToDoItemDetails';
import ToDoItemEditor from './ToDoItemEditor';
import DeleteModal from './DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { getToDoList } from '../../app/toDoSlice';


const Drawer = createDrawerNavigator();

const DrawerScreen = ({ navigation }) => {
    const { username, logout } = useAuth();
    const toDoItemsCount = useSelector((state) => state.toDo.count);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getToDoList());
    }, [])

    async function logoutUser(props) {
        await logout();
        props.navigation.closeDrawer();
        props.navigation.replace("Login");
    }

    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView>
                <Text className="font-bold text-3xl text-black m-4">Hi {username}</Text>
                <DrawerItem
                    label="Logout"
                    onPress={() => {
                        logoutUser(props);
                    }}
                />
            </DrawerContentScrollView>
        );
    }
    return (
        <Drawer.Navigator
            initialRouteName="WelcomeScreen"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ title: `To Do Items Count: ${toDoItemsCount}` }}
        >
            <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Drawer.Screen name="ToDoItemDetails" component={ToDoItemDetails} />
            <Drawer.Screen name="ToDoItemEditor" component={ToDoItemEditor} />
            <Drawer.Screen name="DeleteModal" component={DeleteModal} />
        </Drawer.Navigator>
    )
}

export default DrawerScreen
