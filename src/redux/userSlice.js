import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLoading: false,
    userError:false,
    currentUser:null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        
    }
})