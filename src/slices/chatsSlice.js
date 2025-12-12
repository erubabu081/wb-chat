import { createSlice } from "@reduxjs/toolkit";

const initialChatId = 'chat1';
const initialState = {
    chats: {
        [initialChatId]: {
            id: initialChatId,
            name: 'Chat 1',
            messages: [{ sender: 'api', text: 'Hello! How can i help you today!' }]
        }
    },
    order: [initialChatId]
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addChat: (state, action) => {
            const { id, name } = action.payload;
            if (!id) return;
            state.chats[id] = { id, name: name || `Chat ${state.order.length + 1}`, messages: [{ sender: 'api', text: 'Hello! How can i help you today!' }] };
            state.order.push(id);
        },
        sendMessage: (state, action) => {
            const { chatId, text } = action.payload;
            if (!state.chats[chatId]) return;
            state.chats[chatId].messages.push({ sender: 'user', text });
        },
        recieveMessage: (state, action) => {
            const { chatId, text } = action.payload;
            if (!state.chats[chatId]) return;
            state.chats[chatId].messages.push({ sender: 'api', text });
        }
    }
});

export const { addChat, sendMessage, recieveMessage } = chatsSlice.actions;
export default chatsSlice.reducer;
