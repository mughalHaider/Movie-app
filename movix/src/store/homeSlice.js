import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    url: {},
    genres: {},
    addToFavourite:{}
  },
  reducers: {
    getApiConfiguration: (state, action) => {
        state.url = action.payload
    },
    getGenres: (state, action) => {
        state.genres = action.payload
    },
    addToFavourite: (state, action) => {
      state.addToFavourite = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres, addToFavourite } = homeSlice.actions
export default homeSlice.reducer