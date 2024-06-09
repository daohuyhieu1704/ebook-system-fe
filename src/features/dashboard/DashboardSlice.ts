import { RootState } from './../../app/store';
import { createSlice } from '@reduxjs/toolkit';

export interface CustomCardInterface {
  name: string;
}

export interface DashBoardState {
  TotalAccount: {
    Chuyen_vien: number;
    Sinh_vien: number;
  };
  feedback: {
    pending: number;
    considered: number;
  };
  totalNotification: {
    tin_chi: number;
    hanh_chinh: number;
  };
  dataKhoa: {
    makh: string;
    tenkhoa: string;
  }[];
}

const initialState: DashBoardState = {
  TotalAccount: {
    Chuyen_vien: 0,
    Sinh_vien: 0,
  },
  feedback: {
    pending: 0,
    considered: 0,
  },
  totalNotification: {
    tin_chi: 0,
    hanh_chinh: 0,
  },
  dataKhoa: []
};

export const DashBoardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTotalAccount: (state, action) => {
      state.TotalAccount = action.payload;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    setTotalNotification: (state, action) => {
      state.totalNotification = action.payload;
    },
    setDataKhoa: (state, action) => {
      state.dataKhoa = action.payload;
    },
  },
});

export const { setTotalAccount, setFeedback, setTotalNotification, setDataKhoa } =
  DashBoardSlice.actions;

export const selectTotalAccount = (state: RootState) =>
  state.dashboard.TotalAccount;

export const selectFeedback = (state: RootState) => state.dashboard.feedback;

export const selectTotalNotification = (state: RootState) =>
  state.dashboard.totalNotification;

export const selectDataKhoa = (state: RootState) =>
  state.dashboard.dataKhoa;

export default DashBoardSlice.reducer;
