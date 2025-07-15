import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser } from './authAPI'

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null as string | null
}

export const loginThunk = createAsyncThunk('auth/login', loginUser)
export const registerThunk = createAsyncThunk('auth/register', registerUser)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => { state.user = null; state.token = null }
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message || "Login failed"
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.error = null
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.error.message || "Register failed"
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer