import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface EmployeeManagerState {
  data: any[];
}

const initialState: EmployeeManagerState = {
  data: [],
};

export const EmployeeManagerSlice = createSlice({
  name: 'emp',
  initialState,
  reducers: {
    setDataEmp: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataEmp } = EmployeeManagerSlice.actions;
export const selectDataEmp = (state: RootState) => state.emp.data;

export default EmployeeManagerSlice.reducer;
