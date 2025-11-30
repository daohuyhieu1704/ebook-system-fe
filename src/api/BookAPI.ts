import { ROLE } from "../constants/common";
import axiosClient from "../helper/axios/axiosClient";

export const BookAPI = {
  getAllBooks(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/getall-books`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  createBook(
    data: {
      title: string;
      description: string;
      image: string;
      price: number;
      author_ID: string;
      category_ID: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/create-book`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
  updateBook(
    id: string,
    data: {
      title: string;
      description: string;
      image: string;
      price: number;
      author_ID: string;
      category_ID: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/update-book/${id}`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.patch(url, data, { headers });
  },
};
