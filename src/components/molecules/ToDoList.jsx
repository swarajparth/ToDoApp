import React from 'react'
import ToDoItem from './ToDoItem';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const ToDoList = () => {
    const toDoList = useSelector((state) => state.toDo.toDoList);

    return (
        <FlatList
            data={[...toDoList].reverse()}
            renderItem={({ item }) => <ToDoItem toDoItem={item} />}
            keyExtractor={item => item._id}
        />
    )
}

export default ToDoList
