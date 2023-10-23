import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
            console.log("count set to " + state.count);
        }
    }
})

export const {
    setCount
} = toDoSlice.actions;
export default toDoSlice.reducer;