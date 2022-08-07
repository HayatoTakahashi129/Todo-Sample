import { createSlice } from "@reduxjs/toolkit";
import URI_CONST from "../../hooks/axios/constants/uriConst";

/**
 * returns url Ojbect as {url : initialValue} for only get method.
 * for example
 * {
 * '/todos' : []
 * }
 * @returns Object
 */
const getInitialState = () => {
  const initialStateList = Object.values(URI_CONST)
    .filter((item) => item.url === "get")
    .map((value) => {
      return { [value.url]: value.initialReturnValue };
    });
  const initialState = Object.assign({}, ...initialStateList);
  return initialState;
};

const initialState = getInitialState();

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