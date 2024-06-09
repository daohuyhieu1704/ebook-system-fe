import axios from "axios";
import { LOCAL_STORAGE_ITEM } from "../constants/common";
import axiosClient from "../helper/axios/axiosClient";

const token = localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);

export const ComplainAPI = {
  getAll() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/complain/get-all-complains`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getAnswered() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/question/get_question_answered`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getCountUnanswered() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/question/get_num_answer_n_not_answered`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getUnanswered() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/question/get_question_not_answer_yet`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getTimeResQ() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/question/get_time_response_question`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  updateTimeResQ(time: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/question/upd_time_response_question`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.patch(url, { time }, { headers });
  },
  send(data: { id_rp: string; ndtl: string }) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/complain/repy_complain`;
    const headers = {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
  changeRole(data: { id_rp: string; role_changed: string }) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/question/change_role_question`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axios.patch(url, data, { headers });
  },
};
