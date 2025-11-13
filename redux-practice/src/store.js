import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counterSlice'
import { birdSlice } from './birdSlice'

export const store = configureStore({
  reducer: {
    addressReducer: counterSlice.reducer,
    bird: birdSlice.reducer,
  },
})