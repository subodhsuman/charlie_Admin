import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  theme: "1",
  detail: {},
}

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state, initialState) => {
      state = initialState
      return state;
    },
    loginUser: (state, action) => {
      state.detail = action.payload;
      state.token = action.payload?.token;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setStakeId: (state, action) => {
      state.StakeId = action.payload;
    },
  }
});

export default userReducer.reducer;
export const { loginUser, clearState, setTheme,setStakeId } = userReducer.actions;

