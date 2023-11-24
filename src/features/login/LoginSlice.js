import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_ITEM } from "../../constants/common";

const initialState = {
  isLoggedIn:
    !!localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN) ||
    !!sessionStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN),
  userInfo:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM.USER_INFO) || "{}") ||
    JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_ITEM.USER_INFO) || "{}") ||
    {},
  isLoggedOut: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;

      if (action.payload.remember) {
        localStorage.setItem(
          LOCAL_STORAGE_ITEM.USER_INFO,
          JSON.stringify(action.payload)
        );
        localStorage.setItem(
          LOCAL_STORAGE_ITEM.ACCESS_TOKEN,
          action.payload.accessToken || ""
        );
      } else {
        sessionStorage.setItem(
          LOCAL_STORAGE_ITEM.USER_INFO,
          JSON.stringify(action.payload)
        );
        sessionStorage.setItem(
          LOCAL_STORAGE_ITEM.ACCESS_TOKEN,
          action.payload.accessToken || ""
        );
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      localStorage.removeItem(LOCAL_STORAGE_ITEM.USER_INFO);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.USER_INFO);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
    },
    setUserInfo_safe: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsLoggedOut: (state, action) => {
      state.isLoggedOut = action.payload;
    },
  },
});

export const { loginSuccess, logout, setIsLoggedOut } = loginSlice.actions;

export const selectUserInfo = (state) => state.login.userInfo;
export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectIsLoggedOut = (state) => state.login.isLoggedOut;

export default loginSlice.reducer;
