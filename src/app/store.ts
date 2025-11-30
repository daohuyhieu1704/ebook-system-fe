import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "../features/Login/LoginSlice";
import layoutReducer from "../features/layout/layoutSlice";
import EmployeeManagerReducer from "../features/EmployeeManager/EmployeeManagerSlice";
import BookReducer from "../features/Book/BookSlice";
import CategoryReducer from "../features/Category/CategorySlice";
import AuthorReducer from "../features/Author/AuthorSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    layout: layoutReducer,
    book: BookReducer,
    emp: EmployeeManagerReducer,
    category: CategoryReducer,
    author: AuthorReducer,
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
