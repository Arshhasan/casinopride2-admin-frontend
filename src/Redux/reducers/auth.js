import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetailsAfterLogin: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveLoginData: (state, action) => {
      state.userDetailsAfterLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveLoginData } = authSlice.actions;

export default authSlice.reducer;
