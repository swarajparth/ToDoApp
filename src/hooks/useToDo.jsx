import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext';

export const useToDo = () => {
    return useContext(ToDoContext);
};