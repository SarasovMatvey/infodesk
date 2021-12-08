import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "loader",
    initialState: {
        isShow: false,
    },
    reducers: {
        show: (state) => {
            state.isShow = true;
        },
        hide: (state) => {
            state.isShow = false;
        },
    },
});

export const { show, hide } = counterSlice.actions;

export default counterSlice.reducer;
