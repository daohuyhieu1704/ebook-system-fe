import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import layoutReducer from '../features/layout/layoutSlice';
import DashboardReducer from '../features/dashboard/DashboardSlice';
import NotificationReducer from '../features/Notification/NotificationSlice';
import ComplaintReducer from '../features/Complaint/ComplaintSlice';
import FaqsReducer from '../features/Faqs/FaqsSlice';
import StudentsManagerReducer from '../features/StudentsManager/StudentsManagerSlice';
import CsvcRoomReducer from '../features/Csvc/CsvcSlice';
import RoomReducer from '../features/Room/RoomSlice';
import EmployeeManagerReducer from '../features/EmployeeManager/EmployeeManagerSlice';
import BookingReducer from '../features/Booking/BookingSlice';
import TimeRegisterReducer from '../features/TimeRegister/TimeRegisterSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    layout: layoutReducer,
    dashboard: DashboardReducer,
    notification: NotificationReducer,
    complaint: ComplaintReducer,
    faqs: FaqsReducer,
    booking: BookingReducer,
    room: RoomReducer,
    time_register: TimeRegisterReducer,
    stu: StudentsManagerReducer,
    emp: EmployeeManagerReducer,
    csvc: CsvcRoomReducer,
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
