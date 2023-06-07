import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeComponents: "/dashboard",

}

export const userReducer = createSlice({
    name: "active",
    initialState,
    reducers: {
        clearActive: (state, initialState) => {
            state = initialState
            return state;
        },
        setActive: (state, action) => {
            state.activeComponents = action.payload;
        },
    }
});

export default userReducer.reducer;
export const { setActive, clearActive } = userReducer.actions;

