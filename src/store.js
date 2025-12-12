import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./slices/chatsSlice"

const store = configureStore({
    reducer: {
        chats: chatsReducer,
    }
})

export default store