import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCount } from '../app/toDoSlice';


export const ToDoContext = createContext({});

export default ({ children }) => {
    const dispatch = useDispatch();

    const [toDoList, setToDoList] = useState([]);
    const [toDoItemText, setToDoItemText] = useState("");

    async function getToDoList() {
        try {
            const fetchRes = await fetch(`http://10.0.2.2:3000/api/to-do-list`);
            console.log('fetchRes: ', fetchRes);

            const data = await fetchRes.json();
            console.log("data : ", data);

            setToDoList(data);
            dispatch(setCount(data.length));
        }
        catch (err) {
            console.log("Could not get To Do List, in catch part: ")
            console.log(err.message);
        }
    }

    async function createToDoItem(title, description) {
        console.log("createToDoItem function called in ToDoContext");

        try {
            console.log("title in createToDoItem: "+ title);
            console.log("description in createToDoItem: "+ description);
            const fetchRes = await fetch("http://10.0.2.2:3000/api/create-to-do-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description
                }),
            });
            console.log('fetchRes: ', fetchRes);

            const data = await fetchRes.json();
            console.log("data : ", data);

            getToDoList();
        }
        catch (err) {
            console.log("Could not create To Do Item, in catch part: ");
            console.log(err.message);
        }
    }

    async function editToDoItem(id, title, description) {
        console.log("createToDoItem function called in ToDoContext");

        try {
            const fetchRes = await fetch("http://10.0.2.2:3000/api/update-to-do-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    title,
                    description
                }),
            });
            console.log('fetchRes: ', fetchRes);

            const data = await fetchRes.json();
            console.log("data : ", data);

            getToDoList();
        }
        catch (err) {
            console.log("Could not update To Do Item, in catch part: ");
            console.log(err.message);
        }
    }

    async function deleteToDoItem(_id) {
        console.log("deleteToDoItem function called in ToDoContext for _id: ", _id);

        try {
            const fetchRes = await fetch(`http://10.0.2.2:3000/api/delete-to-do-item?id=${_id}`);
            console.log('fetchRes: ', fetchRes);

            const data = await fetchRes.json();
            console.log("data : ", data);

            getToDoList();
        }
        catch (err) {
            console.log("Could not delete To Do Item, in catch part: ");
            console.log(err.message);
        }
    }

    useEffect(() => {
        getToDoList();
    }, [])

    return (
        <ToDoContext.Provider
            value={{
                toDoItemText,
                toDoList,
                createToDoItem,
                editToDoItem,
                deleteToDoItem
            }}
        >
            {children}
        </ToDoContext.Provider>
    )
}