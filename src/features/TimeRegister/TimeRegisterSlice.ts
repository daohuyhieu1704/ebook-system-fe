import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
    schedule: [],
  };

export const TimeRegisterSlice = createSlice({
    name: 'time_register',
    initialState,
    reducers: {
      setSchedule: (state, action) => {
        state.schedule = action.payload;
      },
    },
  });
  
  export const { setSchedule } = TimeRegisterSlice.actions;
  
  export const selectSchedule = (state: RootState) => state.time_register.schedule;
  
  export default TimeRegisterSlice.reducer;
  