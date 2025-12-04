import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [{sender: 'api', text: "Hello! How can i help you today!"}],
}

const chat3Slice = createSlice ({
    name: 'chat3',
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
export const {sendMessage, recieveMessage} = chat3Slice.actions

export default chat3Slice.reducer