import { ROLE } from "../constants/common";
import axiosClient from "../helper/axios/axiosClient";

export const FeedbackAPI = {
  getAllFeedbacks(book_id: string, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/feedback/getAll/${book_id}`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
