import { createSlice } from '@reduxjs/toolkit'
import AppConstant from '../constants/AppConstant'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    pdf: null,
    numPages: 0,
    loaded: false,
    scale: AppConstant.CANVAS_SCALE,
    src: './assets/LaserLevel.pdf',
    numPageCurrent: 1,
    loadedSrc: true
  },
  reducers: {
    setPDF: (state, action) => {
      state.pdf = action.payload
      state.loadedSrc = true
    },
    setNumPages: (state, action) => {
      state.numPages = action.payload
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload
    },
    setLoadedSrc: (state, action) => {
      state.loadedSrc = action.payload
    },
    setScale: (state, action) => {
      state.scale = action.payload
    },
    setSrc: (state, action) => {
      state.src = action.payload
    },
    setNumPageCurrent: (state, action) => {
      state.numPageCurrent = action.payload
    },

    handleSetScale: (state, action) => {
      if (action.payload) {
        localStorage.setItem('canvas-scale', state.scale + 0.1)
        state.scale += 0.1
      } else {
        localStorage.setItem('canvas-scale', state.scale - 0.1)
        state.scale -= 0.1
      }
    },
    handleSaveCanvas: (state, action) => {
      for (let i = 1; i <= state.numPages; i++) {
        let canvas = document.getElementById('canvas-draw-' + i)
        let data = {
          width: canvas.width,
          height: canvas.height,
          canvasData: canvas.toDataURL()
        }
        localStorage.setItem('canvas-data-' + i, JSON.stringify(data))
      }
      alert('SAVE')
    },
    handleRemoveDataCanvasFromLocal: (state, action) => {
      for (let i = 1; i <= state.numPages; i++) {
        localStorage.removeItem('canvas-data-' + i)
      }
    },
    handleUndo: () => {},
    handleRedo: () => {}
  }
})

export const {
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
  setLoadedSrc
} = appSlice.actions

export const selectPdf = (state) => state.app?.pdf
export const selectNumPages = (state) => state.app?.numPages
export const selectLoaded = (state) => state.app?.loaded
export const selectScale = (state) => state.app?.scale
export const selectSrc = (state) => state.app?.src
export const selectNumPageCurrent = (state) => state.app?.numPageCurrent
export const selectLoadedSrc = (state) => state.app?.loadedSrc
export default appSlice.reducer
