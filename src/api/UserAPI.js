import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";

export const UserAPI = {
  getAll(token) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/emp_inf/get_all_emp`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
