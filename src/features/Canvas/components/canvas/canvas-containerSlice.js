import { createSlice } from "@reduxjs/toolkit";

export const canvasContainerSlice = createSlice({
  name: "canvasContainer",
  initialState: {
    indexHistory: Array.from({ length: 1000 }, (_, i) => i - (i + 1)),
  },
  reducers: {
    setIndexHistory: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { setIndexHistory } = canvasContainerSlice.actions;

export const selectIndexHistory = (state) =>
  state.canvasContainer?.indexHistory;

export default canvasContainerSlice.reducer;
