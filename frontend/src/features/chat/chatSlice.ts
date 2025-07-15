import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [] as { content: string; sender: string }[]
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    }
  }
})

export const { addMessage, setMessages } = chatSlice.actions
export default chatSlice.reducer