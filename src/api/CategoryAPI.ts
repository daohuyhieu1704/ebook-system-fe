import { ROLE } from "../constants/common";
import axiosClient from "../helper/axios/axiosClient";

export const CategoryAPI = {
  getAllCategories(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/getall-category`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  AddCategory(
    data: {
      name: string;
      description: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/add-category`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
  UpdateCategory(
    data: {
      id: string;
      name: string;
      description: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/update-category/${data.id}`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.put(url, data, { headers });
  },
};
