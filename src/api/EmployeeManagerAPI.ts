import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";

export const EmployeeManagerAPI = {
  getAll(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/emp_inf/get_all_emp`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  create(
    data: {
      username: string;
      password: string;
      email: string;
      role: string;
      gender: number;
      sdt: string;
      ngaysinh: string;
      fullname: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/emp_inf/create_emp`;
    return axiosClient.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  update(
    data: {
      username: string;
      password: string;
      email: string;
      role: string;
      gender: number;
      sdt: string;
      ngaysinh: string;
      fullname: string;
      active: number;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/emp_inf/update-emp`;
    return axios.put(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  activate(username: string, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/emp_inf/stop_emp`;
    return axios({
      method: "DELETE",
      url,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        username: username,
      },
    });
  },
  deactive(username: string, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/emp_inf/turn_on_emp`;
    return axiosClient.post(
      url,
      { username },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },
  changePW(
    usename: string,
    oldPassword: string,
    newPassword: string,
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/emp_inf/change_password`;
    return axiosClient.patch(
      url,
      {
        data: { oldPassword, newPassword },
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
