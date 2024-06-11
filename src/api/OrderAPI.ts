import axiosClient from "../helper/axios/axiosClient";

export const notificationAPI = {
  getAll(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/notifi/get_all_notifi`;
    return axiosClient.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${token}`,
      },
    });
  },
  send(data: FormData, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/notifi/send_notifi`;
    const headers = {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
  deactivate(
    data: {
      id_thongbao: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/notifi/hide_notifi`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.put(url, data, { headers });
  },
  activate(
    data: {
      id_thongbao: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/notifi/show_notifi`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.put(url, data, { headers });
  },
};
