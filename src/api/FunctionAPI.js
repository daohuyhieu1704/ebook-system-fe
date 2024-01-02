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
  create(token, data) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/funtion`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
  update(token, id, data) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/funtion/${id}`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.put(url, data, { headers });
  },
};
