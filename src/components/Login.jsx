import React, { useEffect, useState } from 'react'
import { View, TextInput } from 'react-native'
import GlobalButton from './GlobalButton'
import { useAuth } from '../hooks/useAuth'
import Loader from './Loader';

const Login = ({ navigation }) => {
  const { login, loggedIn, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("logged", loggedIn);
    if (loggedIn) {
      navigation.replace("DrawerScreen");
    }
  }, [loggedIn])

  return (
    loading ?
      <Loader />
      :
      <View className="w-full h-full flex justify-center p-4" >
        <TextInput
          className="border border-blue-700 my-2 h-10"
          textAlign="center"
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          maxLength={30}
        />
        <TextInput
          className="border border-blue-700 my-2 h-10"
          textAlign="center"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          maxLength={30}
        />
        <GlobalButton title="Login" variation="large" handler={() => login(username, password)} />
      </View>
  )
}

export default Login;
