import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import settingSlice from "./slice/settingSlice";
import menuSlice from "./slice/menuSlice";
import choiceSlice from "./slice/choiceSlice";

const store = configureStore({
    reducer: {
        setting: settingSlice,
        menu: menuSlice,
        choice: choiceSlice
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;