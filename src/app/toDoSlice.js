import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Platform } from 'react-native';

const initialState = {
    count: 0,
    toDoList: []
};

const domain = Platform.OS === 'ios' ? "localhost" : "10.0.2.2";
const url = `http://${domain}:3000/api/`;

export const getToDoList = createAsyncThunk(
    'getToDoList',
    async () => {
        const data = await (await fetch(url + "to-do-list")).json();
        console.log(data);
        return data;
    }
)

export const createToDoItem = createAsyncThunk(
    'createToDoItem',
    async (data) => {
        const res = await (await fetch(url + "create-to-do-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })).json();

        console.log("res : ", res);
        return { _id: res.insertedId, ...data };
    }
)

export const editToDoItem = createAsyncThunk(
    'editToDoItem',
    async (data) => {
        const res = await (await fetch(url + "update-to-do-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: data._id,
                title: data.title,
                description: data.description
            }),
        })).json();

        console.log("res : ", res);
        return data;
    }
)

export const deleteToDoItem = createAsyncThunk(
    'deleteToDoItem',
    async (_id) => {
        const res = await (await fetch(url + `delete-to-do-item?id=${_id}`)).json();

        console.log("res : ", res);
        return _id;
    }
)



const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getToDoList.fulfilled, (state, action) => {
            state.toDoList = action.payload;
            state.count = action.payload.length;
        });
        builder.addCase(getToDoList.rejected, () => {
            console.log("Could not get To Do List");
        });
        builder.addCase(createToDoItem.fulfilled, (state, action) => {
            state.toDoList.push(action.payload);
            state.count++;
        });
        builder.addCase(createToDoItem.rejected, () => {
            console.log("Could not create new To Do Item");
        });
        builder.addCase(editToDoItem.fulfilled, (state, action) => {
            state.toDoList = state.toDoList.map(item => {
                if (item._id == action.payload._id) {
                    return action.payload;
                }
                return item;
            });
        });
        builder.addCase(editToDoItem.rejected, () => {
            console.log("Could not edit To Do Item");
        });
        builder.addCase(deleteToDoItem.fulfilled, (state, action) => {
            state.toDoList = state.toDoList.filter(item => item._id !== action.payload);
            state.count--;
        });
        builder.addCase(deleteToDoItem.rejected, () => {
            console.log("Could not get To Do List");
        });
    }
})

export default toDoSlice.reducer;