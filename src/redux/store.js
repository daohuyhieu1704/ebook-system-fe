// init store for redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../layout/LayoutSlice";
import loginReducer from "../features/login/LoginSlice";
import DrawReducer from "../features/draw/DrawSlice";

export default configureStore({
  reducer: {
    layout: layoutReducer,
    login: loginReducer,
    draw: DrawReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
