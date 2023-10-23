import 'react-native-gesture-handler';
import React from 'react'
import { Provider } from 'react-redux';
import store from './src/app/store';
import AuthContext from './src/context/AuthContext';
import Home from './src/components/Home';


const App = () => {
  return (
    <Provider store={store}>
      <AuthContext>
        <Home />
      </AuthContext>
    </Provider>
  )
}

export default App
