import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsSlice";
import CartSlice from "./CartSlice";
import userSlice from "./userSlice";
import FavouriteSlice from "./FavouriteSlice";
import ReviewSlice from "./ReviewSlice";
export const store = configureStore({
  reducer:{
    [productsApi.reducerPath] : productsApi.reducer,
    cart : CartSlice,
    user : userSlice,
    favourite : FavouriteSlice,
    review : ReviewSlice,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(productsApi.middleware)
})

