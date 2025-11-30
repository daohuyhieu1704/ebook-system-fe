import axiosClient from "../helper/axios/axiosClient";

export const OrderAPI = {
  getHistory(numPage: number, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/getall-books`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
