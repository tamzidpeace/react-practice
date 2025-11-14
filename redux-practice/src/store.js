import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counterSlice'
import { birdSlice } from './birdSlice'
import { postApi } from './services/post'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    addressReducer: counterSlice.reducer,
    bird: birdSlice.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

setupListeners(store.dispatch)