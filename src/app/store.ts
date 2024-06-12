import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import layoutReducer from "../features/layout/layoutSlice";
import NotificationReducer from "../features/Notification/NotificationSlice";
import EmployeeManagerReducer from "../features/EmployeeManager/EmployeeManagerSlice";
import BookReducer from "../features/Book/BookSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    layout: layoutReducer,
    notification: NotificationReducer,
    book: BookReducer,
    emp: EmployeeManagerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
