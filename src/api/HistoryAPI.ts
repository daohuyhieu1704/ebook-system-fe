import { ROLE } from "../constants/common";
import axiosClient from "../helper/axios/axiosClient";

export const HistoryAPI = {
  getHistory(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/getall-books`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
