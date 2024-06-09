import axios from 'axios';
import { LOCAL_STORAGE_ITEM } from '../constants/common';
import { axiosPost } from '../helper/axios';
import axiosClient from '../helper/axios/axiosClient';

const token = localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);

export const petitionAPI = {
  getRestime() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/form/get_res_time`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
  },
  getAllPetitionUnresolve() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/form/get_all_form`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
  },
  changeRole(data: {
    mathacmac: string,
    role_changed: number;
  }) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/question/change_role_question`;
    return axios({
      method: 'POST',
      url: url,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: data,
    });
  },
  resolved(data: {
    ma_yeu_cau: string;
  }) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/form/solved`;
    return axios.post(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: data,
    });
  },
  changeStatusCode(form_code: string, status_code: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/form/change_state`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axios.patch(url, {
      form_code, status_code
    }, { headers });
  }
};
