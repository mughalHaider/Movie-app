import { configureStore } from '@reduxjs/toolkit'
import homeReducer from "./homeSlice.js"

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
})