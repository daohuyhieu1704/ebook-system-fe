import axiosClient from "../helper/axios/axiosClient";

export const BookAPI = {
  getAll(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room/get_regist_time`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  create(
    data: {
      hk: string;
      start: number;
      end: number;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room/create_regist_time`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
};
