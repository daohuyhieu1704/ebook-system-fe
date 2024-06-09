import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface HanhChinhState {
  reportCSVCList: any[];
  searchRoom: string;
  dataCSVC: any[];
  dataMat: any[];
  material: { [key: string]: any };
}

const initialState: HanhChinhState = {
  reportCSVCList: [],
  searchRoom: "",
  dataCSVC: [],
  dataMat: [],
  material: {},
};

export const CsvcSlice = createSlice({
  name: "csvc",
  initialState,
  reducers: {
    setReportCSVCList: (state, action) => {
      state.reportCSVCList = action.payload;
    },
    setSearchRoom: (state, action) => {
      state.searchRoom = action.payload;
    },
    setDataCSVC: (state, action) => {
      state.dataCSVC = action.payload;
    },
    setDataMat: (state, action) => {
      state.dataMat = action.payload;
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
  },
});

export const {
  setReportCSVCList,
  setSearchRoom,
  setDataCSVC,
  setMaterial,
  setDataMat,
} = CsvcSlice.actions;

export const selectReportCSVCList = (state: RootState) =>
  state.csvc.reportCSVCList;

export const selectSearchRoom = (state: RootState) => state.csvc.searchRoom;

export const selectDataCSVC = (state: RootState) => state.csvc.dataCSVC;

export const selectMaterial = (state: RootState) => state.csvc.material;

export const selectDataMat = (state: RootState) => state.csvc.dataMat;

export default CsvcSlice.reducer;
