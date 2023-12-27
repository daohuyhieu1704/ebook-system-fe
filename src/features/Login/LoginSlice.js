import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_ITEM } from "../../constants/common";

export const LOCAL_DEV_IO_LOGIN = "http://192.168.219.192:4000/";

const initialState = {
  isLoggedIn:
    !!localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN) ||
    !!sessionStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN),
  userInfo:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM.USER_INFO) || "{}") ||
    JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_ITEM.USER_INFO) || "{}") ||
    {},
  role:
    localStorage.getItem(LOCAL_STORAGE_ITEM.ROLE) ||
    sessionStorage.getItem(LOCAL_STORAGE_ITEM.ROLE) ||
    "",
  isLoggedOut: false,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.role = action.payload.role;

      if (action.payload.remember) {
        localStorage.setItem(
          LOCAL_STORAGE_ITEM.USER_INFO,
          JSON.stringify(action.payload)
        );
        localStorage.setItem(LOCAL_STORAGE_ITEM.ROLE, action.payload.role);
        localStorage.setItem(
          LOCAL_STORAGE_ITEM.ACCESS_TOKEN,
          action.payload.accessToken || ""
        );
      } else {
        sessionStorage.setItem(
          LOCAL_STORAGE_ITEM.USER_INFO,
          JSON.stringify(action.payload)
        );
        sessionStorage.setItem(LOCAL_STORAGE_ITEM.ROLE, action.payload.role);
        sessionStorage.setItem(
          LOCAL_STORAGE_ITEM.ACCESS_TOKEN,
          action.payload.accessToken || ""
        );
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      state.role = "";
      localStorage.removeItem(LOCAL_STORAGE_ITEM.USER_INFO);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.ROLE);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.ROLE);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.USER_INFO);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
    },
    setUserInfo_safe: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsLoggedOut: (state, action) => {
      state.isLoggedOut = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  loginSuccess,
  setUserInfo_safe,
  logout,
  setIsLoggedOut,
  setIsLoggedIn,
} = LoginSlice.actions;

export const selectUserInfo = (state) => state.login.userInfo;
export const selectRole = (state) => state.login.role;
export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectIsLoggedOut = (state) => state.login.isLoggedOut;

export default LoginSlice.reducer;
