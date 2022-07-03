import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idToken: "",
  accessToken: "",
  refreshToken: "",
  userInfo: {
    nickname: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateTokens: (state, action) => {
      state.idToken = action.payload.idToken;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateUserInfo: (state, action) => {
      state.userInfo.nickname = action.payload["custom:nickname"];
      state.userInfo.email = action.payload.email;
    },
    clear: (state, action) => {
      state = initialState;
    },
  },
});

export const { updateTokens, updateUserInfo, clear } = userSlice.actions;
export default userSlice.reducer;
