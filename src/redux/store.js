import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "../../src/redux/AppSlice";
import controlReducer from "../components/control/app-controlSlice";
import canvasContainerReducer from "../components/canvas/canvas-containerSlice";
import LayoutReducer from "../features/Layout/LayoutSlice";
import LoginReducer from "../features/Login/LoginSlice";
import FuncReducer from "../features/Func/FuncSlice";
export default configureStore({
  reducer: {
    app: appReducer,
    control: controlReducer,
    canvasContainer: canvasContainerReducer,
    layout: LayoutReducer,
    login: LoginReducer,
    func: FuncReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
