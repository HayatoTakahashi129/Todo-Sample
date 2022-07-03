import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./slices/signupSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    signup: signupSlice,
    user: userSlice,
  },
});
