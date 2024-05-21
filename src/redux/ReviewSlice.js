import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getReview = createAsyncThunk("getReview/ReviewSlice",async(id)=>{
    try{
        const review = await axios.get(`https://ecommerce-api-hlp7.onrender.com/api/review?product=${id}`,{
            headers : {
                Authorization:`Bearer ${localStorage.token}`
            }
        }).then(res=>res.data.data)
        return review;
    }catch(e){
        return "";
    }
})

const ReviewSlice = createSlice({
    name:"ReviewSlice",
    initialState:[],
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getReview.fulfilled,(state,action)=>{
            state = action.payload;
            return state;
        })
    }
})

export default ReviewSlice.reducer;