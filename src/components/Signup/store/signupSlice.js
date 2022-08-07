import { createSlice } from "@reduxjs/toolkit/";

const initialState = {
  email: "",
  nickname: "",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateInput: (state, action) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    },
    clearInput: (state) => {
      state = initialState;
    },
  },
});

export const { updateInput, clearInput } = signupSlice.actions;
export default signupSlice.reducer;
