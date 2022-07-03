import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./slices/signupSlice";

export const store = configureStore({
  reducer: {
    signup: signupSlice,
  },
});
