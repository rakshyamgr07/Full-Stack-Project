import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './userSlice'

export const API = configureStore({
  reducer: {
    user:userSlice
  },
})