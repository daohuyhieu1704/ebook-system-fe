import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum modeFB {
  full = 0,
  unAns = 1,
  ans = 2,
}
export interface ComplaintInterface {
  gioitinh: number;
  hoten: string;
  lop: string;
  id: string;
  mssv: string;
  noidungthacmac: string;
  sdt: string;
  tenthacmac: string;
  thoigian: string;
  role: number;
  answered: 0 | 1;
}
export interface ComplaintState {
  feedbackList: ComplaintInterface[];
  mode: modeFB;
  totalQ: number;
  totalPetition: number;
  resQuestion: number;
}

const initialState: ComplaintState = {
  feedbackList: [],
  mode: modeFB.full,
  totalQ: 0,
  totalPetition: 0,
  resQuestion: 2,
};

export const ComplaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    setFeedbackList: (state, action) => {
      state.feedbackList = action.payload;
    },
    setModeFB: (state, action) => {
      state.mode = action.payload;
    },
    setTotalQ: (state, action) => {
      state.totalQ = action.payload;
    },
    setTotalPetition: (state, action) => {
      state.totalPetition = action.payload;
    },
    setResQuestion: (state, action) => {
      state.resQuestion = action.payload;
    },
  },
});

export const { setFeedbackList, setModeFB, setTotalQ, setResQuestion } =
  ComplaintSlice.actions;

export const selectFeedbackList = (state: RootState) =>
  state.complaint.feedbackList;

export const selectModeFB = (state: RootState) => state.complaint.mode;

export const selectTotalQ = (state: RootState) => state.complaint.totalQ;
export const selectTotalPetition = (state: RootState) =>
  state.complaint.totalPetition;
export const selectResQuestion = (state: RootState) =>
  state.complaint.resQuestion;

export default ComplaintSlice.reducer;
