import React from 'react'
import { Button } from 'react-native'

const GlobalButton = ({ title, variation, handler }) => {
  return (
    <Button
      onPress={handler}
      title={title}
      color="rgb(29 78 216)"
    />
  )
}

export default GlobalButton
