import { createSlice } from "@reduxjs/toolkit";
import URI_CONST from "../../hooks/axios/constants/uiriConst";

/**
 * returns url Ojbect as {url : initialValue} only for get method.
 * for example
 * {
 * '/todos' : []
 * }
 * @returns Object
 */
const getUrlOjbects = () => {
  const initialStateList = Object.values(URI_CONST)
    .filter((item) => item.url === "get")
    .map((value) => {
      return { [value.url]: value.initialReturnValue };
    });
  const initialState = Object.assign({}, ...initialStateList);
  return initialState;
};

const initialState = getUrlOjbects();

export const getApiSlice = createSlice({
  name: "getApi",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state[action.payload.url] = action.payload.data;
    },
  },
});

export const { updateData } = getApiSlice.actions;
export default getApiSlice.reducer;
