import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";
import { axiosPost } from "../helper/axios";
import { get } from "http";

export const UserAPI = {
  checkLoginEmailToken(data: {
    full_name: string;
    password: string;
    token: string;
  }) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/verify`;
    return axiosPost(url, data);
  },
  shop: {
    signUp(data: { full_name: string; email: string; password: string }) {
      const url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/shop/sign-up`;
      return axiosPost(url, data);
    },
    newUser(data: { email: string; captcha: string }) {
      const url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/shop/new-user`;
      return axiosPost(url, data);
    },
  },
  admin: {
    signUp(
      data: { full_name: string; email: string; password: string },
      token: string
    ) {
      const url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/admin/create-account`;
      return axiosClient.post(url, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
    getAllAccount(token: string) {
      const url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/admin/getall-account`;
      return axiosClient.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
    getAccount(token: string, id: string) {
      const url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/admin/get-account`;
      return axiosClient.post(
        url,
        {
          id: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    },
    updateAccount(data: any, token: string) {
      const url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/admin/update-account`;
      return axiosClient.patch(url, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
  },
};
