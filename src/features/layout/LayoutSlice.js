import { createSlice } from "@reduxjs/toolkit";
import { MANAGEMENT_MENU, SearchType } from "../../constants/common";

const initialState = {
  collapsed: false,
  selectedKey: MANAGEMENT_MENU[0].path,
  drawerVisible: false,
  isUpdateForm: false,
  selectedRows: [],
  isRefetch: false,
  isLoadingSubmit: false,
  disableSubmit: false,
};

export const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    },
    changeSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    openDrawer: (state) => {
      state.drawerVisible = true;
    },
    closeDrawer: (state) => {
      state.drawerVisible = false;
    },
    setIsUpdateForm: (state, action) => {
      state.isUpdateForm = action.payload;
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setIsRefetch: (state, action) => {
      state.isRefetch = action.payload;
    },
    setIsLoadingSubmit: (state, action) => {
      state.isLoadingSubmit = action.payload;
    },
    setDisableSubmit: (state, action) => {
      state.disableSubmit = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filterState = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  changeSelectedKey,
  openDrawer,
  closeDrawer,
  setIsUpdateForm,
  setSelectedRows,
  setIsRefetch,
  setIsLoadingSubmit,
  setDisableSubmit,
  setStatusFilter,
  setTypeFilter,
  setSearchParams,
  setMode,
} = LayoutSlice.actions;

export const selectCollapsed = (state) => state.layout.collapsed;
export const selectSelectedKey = (state) => state.layout.selectedKey;
export const selectIsRefetch = (state) => state.layout.isRefetch;
export const selectIsLoadingSubmit = (state) => state.layout.isLoadingSubmit;
export const selectDisableSubmit = (state) => state.layout.disableSubmit;
export const selectSelectedRows = (state) => state.layout.selectedRows;
export const selectIsUpdateForm = (state) => state.layout.isUpdateForm;
export const selectDrawerVisible = (state) => state.layout.drawerVisible;
export const selectStatusFilter = (state) => state.layout.filterState;
export const selectTypeFilter = (state) => state.layout.typeFilter;
export const selectSearchParams = (state) => state.layout.searchParams;
export const selectMode = (state) => state.layout.mode;

export default LayoutSlice.reducer;
