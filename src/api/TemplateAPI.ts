import axios from "axios";
import axiosClient from "../helper/axios/axiosClient";

export const FaqsAPI = {
  getAll(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/faq/get-all-faqs`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  create(data: FormData, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/faq/create-faq`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
  update(data: FormData, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/faq/update-faq`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.put(url, data, { headers });
  },
  hide(mach: string, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/faqs/hide_faqs`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axios({
      method: "DELETE",
      url,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        code_faqs: mach,
      },
    });
  },
  show(mach: string, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/faqs/turn_on_faqs`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.put(
      url,
      {
        code_faqs: mach,
      },
      { headers }
    );
  },
};
