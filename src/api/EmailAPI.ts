import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";

export const ChuyenVienAPI = {
  CreateNewTemplate(
    data: {
      tem_name: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/email/new-template`;
    return axiosClient.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  DestroyToken(
    data: {
      token: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/emp_inf/update-emp`;
    return axios({
      method: "DELETE",
      url,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data,
    });
  },
};
