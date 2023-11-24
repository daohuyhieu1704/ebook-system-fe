import { createSlice } from "@reduxjs/toolkit";
import { AppConstant, MANAGEMENT_MENU } from "../constants/common";

const initialState = {
  collapsed: false,
  selectedKey: MANAGEMENT_MENU[0].path,
  drawerVisible: false,
  isUpdateForm: false,
  selectedRows: [],
  isRefetch: false,
  isLoadingSubmit: false,
  disableSubmit: false,
  pdf: null,
  numPages: 0,
  loaded: false,
  scale: AppConstant.CANVAS_SCALE,
  src: "sample.pdf",
  numPageCurrent: 1,
  loadedSrc: true,
};

export const layoutSlice = createSlice({
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
    setPDF: (state, action) => {
      state.pdf = action.payload;
      state.loadedSrc = true;
    },
    setNumPages: (state, action) => {
      state.numPages = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setLoadedSrc: (state, action) => {
      state.loadedSrc = action.payload;
    },
    setScale: (state, action) => {
      state.scale = action.payload;
    },
    setSrc: (state, action) => {
      state.src = action.payload;
    },
    setNumPageCurrent: (state, action) => {
      state.numPageCurrent = action.payload;
    },

    handleSetScale: (state, action) => {
      if (action.payload) {
        localStorage.setItem("canvas-scale", state.scale + 0.1);
        state.scale += 0.1;
      } else {
        localStorage.setItem("canvas-scale", state.scale - 0.1);
        state.scale -= 0.1;
      }
    },
    handleSaveCanvas: (state, action) => {
      for (let i = 1; i <= state.numPages; i++) {
        let canvas = document.getElementById("canvas-draw-" + i);
        let data = {
          width: canvas.width,
          height: canvas.height,
          canvasData: canvas.toDataURL(),
        };
        localStorage.setItem("canvas-data-" + i, JSON.stringify(data));
      }
      alert("SAVE");
    },
    handleRemoveDataCanvasFromLocal: (state, action) => {
      for (let i = 1; i <= state.numPages; i++) {
        localStorage.removeItem("canvas-data-" + i);
      }
    },
    handleUndo: () => {},
    handleRedo: () => {},
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
  setPDF,
  setNumPages,
  setLoaded,
  setScale,
  setSrc,
  setNumPageCurrent,
  setLineWidth,
  handleSetScale,
  handleSaveCanvas,
  handleRemoveDataCanvasFromLocal,
  handleUndo,
  handleRedo,
  setLoadedSrc,
} = layoutSlice.actions;

export const selectCollapsed = (state) => state.layout.collapsed;
export const selectSelectedKey = (state) => state.layout.selectedKey;
export const selectIsRefetch = (state) => state.layout.isRefetch;
export const selectIsLoadingSubmit = (state) => state.layout.isLoadingSubmit;
export const selectDisableSubmit = (state) => state.layout.disableSubmit;
export const selectSelectedRows = (state) => state.layout.selectedRows;
export const selectIsUpdateForm = (state) => state.layout.isUpdateForm;
export const selectDrawerVisible = (state) => state.layout.drawerVisible;
export const selectPdf = (state) => state.layout?.pdf;
export const selectNumPages = (state) => state.layout?.numPages;
export const selectLoaded = (state) => state.layout?.loaded;
export const selectScale = (state) => state.layout?.scale;
export const selectSrc = (state) => state.layout?.src;
export const selectNumPageCurrent = (state) => state.layout?.numPageCurrent;
export const selectLoadedSrc = (state) => state.layout?.loadedSrc;

export default layoutSlice.reducer;
