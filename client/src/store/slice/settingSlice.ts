import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        loader: 'none',
        ProfileDetails: "",
    },

    reducers:{
        showLoader:(state)=>{
            state.loader= "block"
        },
        hideLoader:(state)=>{
            state.loader= 'none'
        },
        setProfileDetails:(state, action)=>{
            state.ProfileDetails = action.payload
        }
    }
})

export const { showLoader, hideLoader, setProfileDetails } = settingSlice.actions
export default settingSlice.reducer