import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './formSlice'

export const store = configureStore({
  reducer: {
    form: rootReducer
  }
})
