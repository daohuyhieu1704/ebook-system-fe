import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FaqsState {
  data: any[];
}

const initialState: FaqsState = {
  data: [],
};

export const FaqsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    setDataFaqs: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataFaqs } = FaqsSlice.actions;
export const selectDataFaqs = (state: RootState) => state.faqs.data;

export default FaqsSlice.reducer;
