import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: { _id: null, items: [] },
  reducers: {
    addToCart: (state, action) => {
      return { ...state, ...action.payload };
    },
    deleteFromCart: (state, action) => {
      let items = state.items.filter(
        (ele) => ele.product._id !== action.payload.product._id
      );
      return { ...state, items };
    },
    deleteAll: () => {
      return {};
    },
    increment: (state, action) => {
      console.log(state.items, action)
      const pro = state.items.find(
        (ele) => ele.product._id === action.payload.product._id
      );
      if (pro) {
        pro.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const pro = state.items.find(
        (ele) => ele.product._id === action.payload.product._id
      );
      if (pro) {
        pro.quantity > 0 ? (pro.quantity -= 1) : (pro.quantity = 0);
      }
    },
  },
});

export const { addToCart, deleteFromCart, deleteAll, increment, decrement } =
  CartSlice.actions;

export default CartSlice.reducer;
