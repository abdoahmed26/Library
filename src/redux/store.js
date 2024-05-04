import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsSlice";
import CartSlice from "./CartSlice";
import userSlice from "./userSlice";
export const store = configureStore({
  reducer:{
    [productsApi.reducerPath] : productsApi.reducer,
    cart : CartSlice,
    user : userSlice,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(productsApi.middleware)
})

