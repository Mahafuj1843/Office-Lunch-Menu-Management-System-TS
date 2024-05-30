import { createSlice } from "@reduxjs/toolkit";

export const choiceSlice = createSlice({
    name: 'choice',
    initialState: {
        choices: [],
        total: 0,
    },

    reducers:{
        setChoices: (state, action)=>{
            state.choices = action.payload
        },
        setChoiceTotal: (state, action)=>{
            state.total = action.payload
        },
    }
})

export const { setChoices, setChoiceTotal } = choiceSlice.actions
export default choiceSlice.reducer