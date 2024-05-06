import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState:{},
    reducers:{
        addUser : (state,action)=>{
            state = action.payload;
            return state;
        }
    }
})

export const {addUser} = userSlice.actions;

export default userSlice.reducer;