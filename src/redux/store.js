import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "../../src/redux/AppSlice";
import controlReducer from "../features/Canvas/components/control/app-controlSlice";
import canvasContainerReducer from "../features/Canvas/components/canvas/canvas-containerSlice";
import LayoutReducer from "../features/Layout/LayoutSlice";
import LoginReducer from "../features/Login/LoginSlice";
import FuncReducer from "../features/Func/FuncSlice";
import UserReducer from "../features/User/UserSlice";
export default configureStore({
  reducer: {
    app: appReducer,
    control: controlReducer,
    canvasContainer: canvasContainerReducer,
    layout: LayoutReducer,
    login: LoginReducer,
    func: FuncReducer,
    user: UserReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
