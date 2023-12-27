import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  switchList: [],
};

export const TableLayoutSlice = createSlice({
  name: "tblay",
  initialState,
  reducers: {
    setSwitchList: (state, action) => {
      state.switchList = action.payload;
    },
  },
});

export const { setSwitchList } = TableLayoutSlice.actions;
export const selectSwitchList = (state) => state.tblay.switchList;

export default TableLayoutSlice.reducer;
