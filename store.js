import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import thisBookReduser from './slices/thisBookSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    thisBook: thisBookReduser,
  },
})