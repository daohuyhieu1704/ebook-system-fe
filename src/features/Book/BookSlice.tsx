import { createSlice } from "@reduxjs/toolkit";

export interface BookState {
  data: any[];
}

const initialState: BookState = {
  data: [],
};

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setDataBook: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataBook } = BookSlice.actions;

export const selectDataBook = (state: any) => state.booking.data;

export default BookSlice.reducer;
