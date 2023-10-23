import React, { useEffect, useState } from 'react'
import { View, Modal, Text } from 'react-native'
import GlobalButton from './GlobalButton';
import { useToDo } from '../hooks/useToDo';

const DeleteModal = ({ route, navigation }) => {
  const { deleteToDoItem } = useToDo();
  const _id = route.params._id;
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    deleteToDoItem(_id);
    setModalVisible(!modalVisible);
    navigation.goBack();
    console.log("Confirmed to delete this ToDo Item");
  };

  useEffect(() => {
    setModalVisible(true);
    console.log("_id: " + _id);
  }, [route]);

  return (
    <View className="flex-1 justify-center">
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModalVisible(!modalVisible);
          navigation.goBack();
        }}>
        <View className="flex-1 justify-center align-center">
          <Text className="text-center text-black text-xl font-bold m-5">Are you sure you want to delete?</Text>
          <View className="flex flex-row justify-evenly">
            <GlobalButton
              title="Delete"
              variation="small"
              handler={handleDelete} />
            <GlobalButton
              title="Cancel"
              variation="small"
              handler={() => {
                setModalVisible(!modalVisible);
                navigation.goBack();
                console.log("Cancelled deleting this ToDo Item");
              }} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default DeleteModal
