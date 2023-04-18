import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        user:null,
    },
    reducers:{
        login: (state,action) => {
            state.action=action.payload;
        }
    }

});

export const {login} = userSlice.actions;


export default userSlice.reducer;

export const selectUser = (state) =>state.user.user;  // user 

export const selectAction = (state) => state.user.action;