import React from 'react'
import { Text } from 'react-native'
import WelcomeScreen from './WelcomeScreen';
import Login from './Login';
import { useAuth } from '../hooks/useAuth';
import ToDoContext from '../context/ToDoContext';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ToDoItemDetails from './ToDoItemDetails';
import ToDoItemEditor from './ToDoItemEditor';
import DeleteModal from './DeleteModal';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
    const { username, logout } = useAuth();
    const toDoItemsCount = useSelector((state) => state.toDo.count);

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

    const DrawerScreen = ({ navigation }) => {
        return (
            <ToDoContext>
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
            </ToDoContext>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Home
