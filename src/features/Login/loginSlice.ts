import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LOCAL_STORAGE_ITEM } from "../../constants/common";

export interface CliToSerLogin {
  login: (role: string) => void;
  logout: () => void;
}

export interface jsonNotifyInterface {
  code_notify: string;
  title: string;
  content: string;
  time: string;
  list_link_file: any[];
  deleted: number;
}
export interface empChangeInterface {
  username: string;
  hoten: string;
  sdt: string;
  mota: string;
  role: string;
  deleted: 0 | 1;
}

export interface LoginType {
  username: string;
  fullname: string;
  password: string;
  remember: boolean;
  ggSignIn: any;
}

export interface UserInfo {
  username?: string;
  fullname?: string;
  accessToken?: string;
  refreshToken?: string;
  remember?: boolean;
  role?: string;
}

export interface LoginState {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  role: string;
  isLoggedOut: boolean;
}

const initialState: LoginState = {
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

export const loginSlice = createSlice({
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
        localStorage.setItem(
          LOCAL_STORAGE_ITEM.REFRESH_TOKEN,
          action.payload.refreshToken || ""
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
        sessionStorage.setItem(
          LOCAL_STORAGE_ITEM.REFRESH_TOKEN,
          action.payload.refreshToken || ""
        );
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      state.role = "";
      localStorage.removeItem(LOCAL_STORAGE_ITEM.USER_INFO);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.ROLE);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.ROLE);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.USER_INFO);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.REFRESH_TOKEN);
    },
    setUserInfo_safe: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsLoggedOut: (state, action) => {
      state.isLoggedOut = action.payload;
    },
  },
});

export const { loginSuccess, setUserInfo_safe, logout, setIsLoggedOut } =
  loginSlice.actions;

export const selectUserInfo = (state: RootState) => state.login.userInfo;
export const selectRole = (state: RootState) => state.login.role;
export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const selectIsLoggedOut = (state: RootState) => state.login.isLoggedOut;

export default loginSlice.reducer;
