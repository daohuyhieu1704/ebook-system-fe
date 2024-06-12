import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";
import { axiosPost } from "../helper/axios";

export const AuthenAPI = {
  LogIn(data: { email: string; password: string }) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/authen/shop/login`;
    return axiosPost(url, data);
  },
  RefreshToken(data: { refreshToken: string }, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/authen/shop/refresh-token`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
  PostLogout(data: { refreshToken: string }, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/authen/shop/logout`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
};
