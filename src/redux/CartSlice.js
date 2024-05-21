/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("getCart/CartSlice",async()=>{
  try{
    const cart = await axios.get("https://ecommerce-api-hlp7.onrender.com/api/cart",{
          headers : {
            Authorization:`Bearer ${localStorage.token}`
          }
      }).then((res)=>{
        return res.data.data
      })
    return cart;
  }catch(error){
    return ""
  }
})

const initialState = {
  _id:"",
  cartItems: [],
  createdAt:"",
  totalCartPrice:"",
  updatedAt: "",
  user:"",
  __v:"",
}

const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(getCart.fulfilled,(state,action)=>{
      state = action.payload
      return state;
    })
    builder.addCase(getCart.rejected,(state)=>{
      state = initialState
      return state;
    })
  }
});

export default CartSlice.reducer;
