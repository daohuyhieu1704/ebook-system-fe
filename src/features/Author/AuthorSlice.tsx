import { createSlice } from "@reduxjs/toolkit";

export interface AuthorState {
  data: any[];
}

const initialState: AuthorState = {
  data: [],
};

export const AuthorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    setDataAuthor: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataAuthor } = AuthorSlice.actions;

export const selectDataAuthor = (state: any) => state.author.data;

export default AuthorSlice.reducer;
