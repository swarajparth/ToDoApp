import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "./toDoSlice";

const store = configureStore({
    reducer: {
        toDo: toDoSlice
    }
})

export default store;