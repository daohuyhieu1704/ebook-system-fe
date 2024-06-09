import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MANAGEMENT_MENU } from '../../constants/common';

export interface LayoutState {
  collapsed: boolean;
  selectedKey: string;
  drawerRightVisible: boolean;
  drawerBottomVisible: boolean;
  isUpdateForm: boolean;
  selectedRows: any[];
  isRefetch: boolean;
  isLoadingSubmit: boolean;
  disableSubmit: boolean;
  filterState: number | null;
  searchParams: string;
  mode: number;
}

const initialState: LayoutState = {
  collapsed: false,
  selectedKey: MANAGEMENT_MENU[0].path,
  drawerRightVisible: false,
  drawerBottomVisible: false,
  isUpdateForm: false,
  selectedRows: [],
  isRefetch: false,
  isLoadingSubmit: false,
  disableSubmit: false,
  filterState: null,
  searchParams: '',
  mode: 0,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    },
    changeSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    openDrawerRight: (state) => {
      state.drawerRightVisible = true;
    },
    openDrawerBottom: (state) => {
      state.drawerBottomVisible = true;
    },
    closeDrawerRight: (state) => {
      state.drawerRightVisible = false;
    },
    closeDrawerBottom: (state) => {
      state.drawerBottomVisible = false;
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
  openDrawerRight,
  openDrawerBottom,
  closeDrawerRight,
  closeDrawerBottom,
  setIsUpdateForm,
  setSelectedRows,
  setIsRefetch,
  setIsLoadingSubmit,
  setDisableSubmit,
  setStatusFilter,
  setSearchParams,
  setMode
} = layoutSlice.actions;

export const selectCollapsed = (state: RootState) => state.layout.collapsed;
export const selectSelectedKey = (state: RootState) => state.layout.selectedKey;
export const selectIsRefetch = (state: RootState) => state.layout.isRefetch;
export const selectIsLoadingSubmit = (state: RootState) =>
  state.layout.isLoadingSubmit;
export const selectDisableSubmit = (state: RootState) =>
  state.layout.disableSubmit;
export const selectSelectedRows = (state: RootState) =>
  state.layout.selectedRows;
export const selectIsUpdateForm = (state: RootState) =>
  state.layout.isUpdateForm;
export const selectDrawerRightVisible = (state: RootState) =>
  state.layout.drawerRightVisible;
  export const selectDrawerBottomVisible = (state: RootState) =>
  state.layout.drawerBottomVisible;
export const selectStatusFilter = (state: RootState) =>
  state.layout.filterState;
export const selectSearchParams = (state: RootState) =>
  state.layout.searchParams;
export const selectMode = (state: RootState) =>
  state.layout.mode;

export default layoutSlice.reducer;
