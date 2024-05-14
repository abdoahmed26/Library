import { createSlice } from "@reduxjs/toolkit";

const FavouriteSlice = createSlice({
    name:"FavoriteSlice",
    initialState:[],
    reducers:{
        addFavourite : (state,action)=>{
            state = action.payload
            return state;
        },
        removeFavourite : (state,action)=>{
            state = state.filter(e=>e._id!==action.payload);
            return state;
        }
    }
})
export const {addFavourite, removeFavourite} = FavouriteSlice.actions;

export default FavouriteSlice.reducer;