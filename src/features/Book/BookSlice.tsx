import { createSlice } from "@reduxjs/toolkit";

export interface BookState {
  data: any[];
  dataFeedback: any[];
}

const initialState: BookState = {
  data: [],
  dataFeedback: [],
};

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setDataBook: (state, action) => {
      state.data = action.payload;
    },
    setDataFeedback: (state, action) => {
      state.dataFeedback = action.payload;
    },
  },
});

export const { setDataBook, setDataFeedback } = BookSlice.actions;

export const selectDataBook = (state: any) => state.book.data;
export const selectDataFeedback = (state: any) => state.book.dataFeedback;

export default BookSlice.reducer;
