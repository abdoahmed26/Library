/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {_id:"",cartItems: [],
  createdAt:"",
  totalCartPrice:"",
  updatedAt: "",
  user:"",
  __v:"",
  },
  reducers: {
    deleteFromCart: (state, action) => {
      const cartItems = state.cartItems?.filter((ele) => ele._id !== action.payload._id);
      state.cartItems = cartItems;
      return state;
    },
    deleteAll: () => {
      return [];
    },
    increment: (state, action) => {
      const pro = state.cartItems.find(
        (ele) => ele._id === action.payload._id
      );
      if (pro) {
        pro.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const pro = state.cartItems.find(
        (ele) => ele._id === action.payload._id
      );
      if (pro) {
        pro.quantity > 0 ? (pro.quantity -= 1) : (pro.quantity = 0);
      }
    },
    getBook : (state, action) =>{
      state = action.payload
      return state;
    }
  },
});

export const { deleteFromCart, deleteAll, increment, decrement, getBook} = CartSlice.actions;

export default CartSlice.reducer;
