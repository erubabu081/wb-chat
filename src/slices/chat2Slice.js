import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [{sender: 'api', text: "Hello! How can i help you today!"}],
}

const chat2Slice = createSlice ({
    name: 'chat2',
    initialState,
    reducers : {
        sendMessage: (state, action) => {
            state.messages.push ({sender: 'user', text: action.payload});
        },
        recieveMessage : (state, action) => {
            state.messages.push ({sender: 'api', text: action.payload});
        }
    }

})
export const {sendMessage, recieveMessage} = chat2Slice.actions

export default chat2Slice.reducer