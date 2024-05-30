import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menus: [],
        menuDetails: "",
        total: 0,
    },

    reducers: {
        setMenus: (state, action) => {
            state.menus = action.payload
        },
        setMenuTotal: (state, action) => {
            state.total = action.payload
        },
        setMenuDetails: (state, action) => {
            state.menuDetails = action.payload
        },
    }
})

export const { setMenus, setMenuTotal, setMenuDetails } = menuSlice.actions
export default menuSlice.reducer