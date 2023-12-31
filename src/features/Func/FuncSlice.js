import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  funcList: [],
};

export const FuncSlice = createSlice({
  name: "func",
  initialState,
  reducers: {
    setFuncList: (state, actions) => {
      state.funcList = actions.payload;
    },
  },
});

export const { setFuncList } = FuncSlice.actions;

export const selectFuncList = (state) => state.func.funcList;

export default FuncSlice.reducer;
