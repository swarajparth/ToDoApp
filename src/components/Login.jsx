import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import GlobalButton from './GlobalButton'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="w-full h-full flex justify-center p-4" >
      <TextInput
        className="border border-blue-700 my-2 h-10"
        textAlign="center"
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        maxLength={20}
      />
      <TextInput
        className="border border-blue-700 my-2 h-10"
        textAlign="center"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        maxLength={20}
      />
      <GlobalButton title="Login" variation="Rectangular" handler={() => login(username, password)} />
    </View>
  )
}

export default Login