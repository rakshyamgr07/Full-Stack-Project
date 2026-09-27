import { createSlice } from '@reduxjs/toolkit'

const savedUser = localStorage.getItem("user")

let initialUser = { token: null }

try {
    if (savedUser && savedUser !== "undefined") {
        initialUser = JSON.parse(savedUser)
    }
} catch (error) {
    console.log("Invalid user data in localStorage")
    localStorage.removeItem("user")
}

export const userSlice = createSlice({
    name: 'user',

    initialState: initialUser,

    reducers: {
        login: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            return action.payload
        },

        logout: () => {
            localStorage.removeItem("user")
            return { token: null }
        },
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer