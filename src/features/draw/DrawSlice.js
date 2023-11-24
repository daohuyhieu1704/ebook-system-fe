import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_ITEM } from "../../constants/common";

const initialState = {
  colorR: "1",
  colorG: "1",
  colorB: "1",
  opacity: 1,
  lineWidth: 3,
  typeDraw: "drawFree",
  isErase: "false",
  flagDraw: true,
  undoState: true,
  redoState: true,
  ClearAllState: false,

  textContent: "",
  textSpecify: false,
  textMode: false,
  textStart: [0, 0],
  textEnd: [0, 0],
  textSize: 20,
  textColor: {
    R: 0,
    G: 0,
    B: 0,
  },
  textBoundary: {
    isHave: false,
    width: 1,
    style: "solid",
    color: "#000",
  },
};

export const DrawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    setColorR: (state, action) => {
      state.colorR = action.payload;
    },
    setColorG: (state, action) => {
      state.colorG = action.payload;
    },
    setColorB: (state, action) => {
      state.colorB = action.payload;
    },
    setOpacity: (state, action) => {
      state.opacity = action.payload;
    },
    setTypeDraw: (state, action) => {
      state.typeDraw = action.payload;
    },
    setFlagDraw: (state, action) => {
      state.flagDraw = action.payload;
    },
    setUndoState: (state, action) => {
      state.undoState = action.payload;
    },
    setRedoState: (state, action) => {
      state.redoState = action.payload;
    },
    setLineWidth: (state, action) => {
      state.lineWidth = action.payload;
    },
    setClearAllState: (state, action) => {
      state.ClearAllState = action.payload;
    },
    setEraseState: (state, action) => {
      state.isErase = action.payload;
    },
    setTextContent: (state, action) => {
      state.textContent = action.payload;
    },
    setTextSpecify: (state, action) => {
      state.textSpecify = action.payload;
    },
    setTextMode: (state, action) => {
      state.textMode = action.payload;
    },
    setTextStart: (state, action) => {
      state.textStart = action.payload;
    },
    setTextEnd: (state, action) => {
      state.textEnd = action.payload;
    },
    setTextSize: (state, action) => {
      state.textSize = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setTextBoundary: (state, action) => {
      state.textBoundary = action.payload;
    },
  },
});

export const {
  setColorR,
  setOpacity,
  setColorB,
  setColorG,
  setTypeDraw,
  setFlagDraw,
  setRedoState,
  setUndoState,
  setLineWidth,
  setClearAllState,
  setEraseState,
  setTextContent,
  setTextSpecify,
  setTextMode,
  setTextStart,
  setTextEnd,
  setTextSize,
  setTextColor,
  setTextBoundary,
  setTextWH,
} = DrawSlice.actions;

export const selectColorR = (state) => state.control?.colorR;
export const selectColorG = (state) => state.control?.colorG;
export const selectColorB = (state) => state.control?.colorB;
export const selectOpacity = (state) => state.control?.opacity;
export const selectTypeDraw = (state) => state.control?.typeDraw;
export const selectFlagDraw = (state) => state.control?.flagDraw;
export const selectUndoState = (state) => state.control?.undoState;
export const selectRedoState = (state) => state.control?.redoState;
export const selectLineWidth = (state) => state.control?.lineWidth;
export const selectClearAllState = (state) => state.control?.ClearAllState;
export const selectEraseState = (state) => state.control?.isErase;
export const selectTextContent = (state) => state.control?.textContent;
export const selectTextSpecify = (state) => state.control?.textSpecify;
export const selectTextMode = (state) => state.control?.textMode;
export const selectTextStart = (state) => state.control?.textStart;
export const selectTextEnd = (state) => state.control?.textEnd;
export const selectTextSize = (state) => state.control?.textSize;
export const selectTextColor = (state) => state.control?.textColor;
export const selectTextBoundary = (state) => state.control?.textBoundary;

export default DrawSlice.reducer;
