import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "../components/Signup/store/signupSlice";
import userSlice from "./slices/userSlice";
import getApiSlice from "./slices/getApiSlice";

export const store = configureStore({
  reducer: {
    signup: signupSlice,
    user: userSlice,
    getApi: getApiSlice,
  },
});
