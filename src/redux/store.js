import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from '../../src/redux/AppSlice'
import controlReducer from '../components/control/app-controlSlice'
import canvasContainerReducer from '../components/canvas/canvas-containerSlice'
export default configureStore({
  reducer: {
    app: appReducer,
    control: controlReducer,
    canvasContainer: canvasContainerReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})
