import { configureStore } from "@reduxjs/toolkit";
import chat1Reducer  from "./slices/chat1Slice"
import chat2Reducer from "./slices/chat2Slice"
import chat3Reducer from "./slices/chat3Slice"


const store = configureStore({
    reducer : {
        chat1: chat1Reducer,
        chat2: chat2Reducer,
        chat3: chat3Reducer,
    }
})


export default store