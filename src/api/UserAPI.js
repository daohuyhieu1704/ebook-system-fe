import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";

export const UserAPI = {
  getAll(token) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/user`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  loginGuest(data) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/login_guest`;
    return axiosClient.post(url, data);
  },
};
