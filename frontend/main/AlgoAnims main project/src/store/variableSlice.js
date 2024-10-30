import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    codechef: `https://codechef-api.vercel.app/handle/${localStorage.getItem("codechef")}`,
    leetcode:`https://leetcode-stats-api.herokuapp.com/${localStorage.getItem("leetcode")}`,
    gfg: `https://geeks-for-geeks-api.vercel.app/${localStorage.getItem("gfg")}`,
}

export const variableSlice = createSlice({
    name : 'variables',
    initialState,
    reducers:{
        updateUname : (state,action)=>{
            state.codechef = `https://codechef-api.vercel.app/handle/${localStorage.getItem("codechef")}`;
            state.leetcode = `https://leetcode-stats-api.herokuapp.com/${localStorage.getItem("leetcode")}`;
            state.gfg = `https://geeks-for-geeks-api.vercel.app/${localStorage.getItem("gfg")}`;
        },
    }
})

export const {updateUname} = variableSlice.actions;

export const variableReducer = variableSlice.reducer;