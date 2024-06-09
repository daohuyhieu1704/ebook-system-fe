import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../../app/store';

export interface QuestionFeedbackState {
  hasStu: boolean;
  year: string;
  dataStu: any[];
}

const initialState: QuestionFeedbackState = {
  hasStu: false,
  year: `${moment().toDate().getFullYear()}`,
  dataStu: [],
};

export const StudentsManagerSlice = createSlice({
  name: 'stu',
  initialState,
  reducers: {
    setHasStu: (state, action) => {
      state.hasStu = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setDataStu: (state, action) => {
      state.dataStu = action.payload;
    },
  },
});

export const {
  setHasStu,
  setYear,
  setDataStu
} = StudentsManagerSlice.actions;

export const selectHasStu = (state: RootState) => state.stu.hasStu;

export const selectDataStu = (state: RootState) => state.stu.dataStu;

export const selectYear = (state: RootState) => state.stu.year;

export default StudentsManagerSlice.reducer;
