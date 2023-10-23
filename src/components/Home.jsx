import React from 'react'
import { Text, View } from 'react-native'
import Loader from './Loader';
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


const Drawer = createDrawerNavigator();

const Home = () => {
    const { username, loading, loggedIn, logout } = useAuth();
    const toDoItemsCount = useSelector((state) => state.toDo.count);

    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView>
                <Text className="font-bold text-3xl text-black m-4">Hi {username}</Text>
                <DrawerItem
                    label="Logout"
                    onPress={() => {
                        logout();
                        props.navigation.closeDrawer();
                    }}
                />
            </DrawerContentScrollView>
        );
    }

    return (
        <NavigationContainer>
            {
                loading
                    ?
                    <Loader />
                    :
                    loggedIn
                        ?
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
                        :
                        <View>
                            <Login />
                        </View>
            }
        </NavigationContainer>
    );
}

export default Home
