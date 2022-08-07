import { createSlice } from "@reduxjs/toolkit/";

const initialState = {
  email: "",
  username: "",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    update: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
  },
});

export const { update } = signupSlice.actions;
export default signupSlice.reducer;
