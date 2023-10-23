import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext({});

export default ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);


    const validateCredential = (textCredential) => {
        return (textCredential != null && textCredential != "");
    }

    const login = async (username, password) => {
        try {
            if (validateCredential(username) && validateCredential(password)) {
                await AsyncStorage.setItem('username', username);
                setUsername(username);
                setLoggedIn(true);
                console.log('login successful')
            }
            else {
                Alert.alert("Please enter valid credentials!");
                console.log("invalid credentials!");
            }
        }
        catch (e) {
            Alert.alert("Error logging in!");
            console.log("Error logging in!", e);
        }
    }

    const authenticate = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            if (validateCredential(username)) {
                setUsername(username);
                setLoggedIn(true);
                console.log("username found: ", username);
            }
            else {
                console.log("username not found!");
            }
        }
        catch (e) {
            console.log("Could not authenticate!", e);
        }
        finally {
            setLoading(false);
            console.log('loader set to false')
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('username');
            setUsername(null);
            setLoggedIn(false);
            console.log('logout successful')
        }
        catch (e) {
            Alert.alert("Error logging out!");
            console.log("Error logging out!", e);
        }
    }


    useEffect(() => {
        setTimeout(() => {
            authenticate();
        }, 500);
    }, []);


    return (
        <AuthContext.Provider
            value={{
                loading,
                loggedIn,
                username,
                authenticate,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
