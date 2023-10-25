import React from 'react'
import { useToDo } from '../../hooks/useToDo';
import ToDoItem from './ToDoItem';
import { FlatList } from 'react-native';

const ToDoList = () => {
    const { toDoList } = useToDo();

    return (
        <FlatList
            data={[...toDoList].reverse()}
            renderItem={({ item }) => <ToDoItem toDoItem={item} />}
            keyExtractor={item => item._id}
            // inverted={true}
        />
    )
}

export default ToDoList