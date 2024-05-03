import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name:"CartSlice",
    initialState:[],
    reducers:{
        addToCart : (state,action)=>{
            const pro = state.find(ele=>ele.id===action.payload.id)
            if(pro){
                pro.quantity += 1;
            }
            else {
                const book = {...action.payload,quantity:1};
                state.push(book);
            }
        },
        deleteFromCart : (state, action) => {
            state = state.filter(ele=> ele.id !== action.payload.id)
            return state;
        },
        deleteAll : () => {
            return [];
        },
        increment : (state, action) => {
            const pro = state.find(ele=>ele.id===action.payload.id)
            if(pro){
                pro.quantity += 1;
            }
        },
        decrement : (state, action) => {
            const pro = state.find(ele=>ele.id===action.payload.id)
            if(pro){
                pro.quantity > 0 ? pro.quantity -= 1 : pro.quantity= 0;
            }
        },
    }
})

export const { addToCart, deleteFromCart, deleteAll, increment, decrement } = CartSlice.actions;

export default CartSlice.reducer;