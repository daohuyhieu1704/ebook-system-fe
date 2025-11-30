import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CategoryState {
  data: any[];
  searchCate: string;
}

const initialState: CategoryState = {
  data: [],
  searchCate: "",
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryData: (state, action) => {
      state.data = action.payload;
    },
    setSearchCate: (state, action) => {
      state.searchCate = action.payload;
    },
  },
});

export const { setCategoryData, setSearchCate } = CategorySlice.actions;

export const selectCategoryData = (state: RootState) => state.category.data;
export const selectSearchCate = (state: RootState) => state.category.searchCate;

export default CategorySlice.reducer;
