import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem("user")) || { token: null },
    reducers: {
        login: (state, action) => {

            localStorage.setItem("user", JSON.stringify(action.payload))
            return action.payload
        },
        logout: (state) => {
            localStorage.removeItem("user")
            return { token: null }
        },

    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer