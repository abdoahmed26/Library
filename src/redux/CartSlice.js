import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const pro = state.find(ele => ele._id === action.payload._id)
      if(pro){
        pro.quantity += 1;
      }
      else {
        const book = {...action.payload };
        state.push(book);
      }
    },
    deleteFromCart: (state, action) => {
      state = state.filter((ele) => ele._id !== action.payload._id);
      return state;
    },
    deleteAll: () => {
      return [];
    },
    increment: (state, action) => {
      const pro = state.find(
        (ele) => ele._id === action.payload._id
      );
      if (pro) {
        pro.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const pro = state.find(
        (ele) => ele._id === action.payload._id
      );
      if (pro) {
        pro.quantity > 0 ? (pro.quantity -= 1) : (pro.quantity = 0);
      }
    },
    getBook : (state, action) =>{
      if(state.length < action.payload.length){
        state = action.payload
        return state;
      }
    }
  },
});

export const { addToCart, deleteFromCart, deleteAll, increment, decrement, getBook} =
  CartSlice.actions;

export default CartSlice.reducer;
