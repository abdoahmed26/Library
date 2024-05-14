import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsSlice";
import CartSlice from "./CartSlice";
import userSlice from "./userSlice";
import FavouriteSlice from "./FavouriteSlice";
export const store = configureStore({
  reducer:{
    [productsApi.reducerPath] : productsApi.reducer,
    cart : CartSlice,
    user : userSlice,
    favourite : FavouriteSlice
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(productsApi.middleware)
})

