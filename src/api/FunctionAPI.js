import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";

export const FunctionAPI = {
  getAll(token) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/funtion/get_all_func`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
