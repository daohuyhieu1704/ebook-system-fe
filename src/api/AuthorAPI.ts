import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";
import { axiosPost } from "../helper/axios";

export const AuthorAPI = {
  getAllAuthors(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/getall-author`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  createAuthor(
    author: {
      name: string;
      description: string;
      img: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/add-author`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, author, { headers });
  },
  updateAuthor(id: string, data: any, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/book/admin/update-author/${id}`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.patch(url, data, { headers });
  },
};
