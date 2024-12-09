import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../utils";

const initialState = [

]

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async() => {
    const response = await client.get('users');
    return response.data
})


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state,action)=>{
            console.log("users", action.payload);
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer