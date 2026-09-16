import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './userSlice'
import  postSlice  from './postSlice'

export const API = configureStore({
  reducer: {
    user:userSlice,
    post: postSlice
  },
})