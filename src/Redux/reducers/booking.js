import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetailsAfterLogin: {},
};

export const bookingslice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    saveLoginData: (state, action) => {
      state.userDetailsAfterLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveLoginData } = bookingslice.actions;

export default bookingslice.reducer;
