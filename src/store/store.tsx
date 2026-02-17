import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './api/productApi'
import cartReducer from './slice/cartSlice'
import balanceReducer from './slice/balanceSlice'



export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart: cartReducer,
    balance:balanceReducer
  },
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(productApi.middleware),
})

export type RootState = ReturnType<typeof store.getState> // RootState, store'un tüm state'ini temsil eder
export type AppDispatch = typeof store.dispatch // AppDispatch, store'un dispatch fonksiyonunu temsil eder