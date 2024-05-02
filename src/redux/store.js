import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsSlice";
import CartSlice from "./CartSlice";
export const store = configureStore({
  reducer:{
    [productsApi.reducerPath] : productsApi.reducer,
    cart : CartSlice,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(productsApi.middleware)
})

