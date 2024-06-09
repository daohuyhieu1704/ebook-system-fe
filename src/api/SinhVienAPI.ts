import axiosClient from "../helper/axios/axiosClient";

export const SinhVienAPI = {
  getAllSV(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/student/get-all-stu`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getViolationSV(mssv: string, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/student/history-violation-stu`;
    const data = {
      mssv,
    };
    return axiosClient.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getHistoryRoom(mssv: string, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/student/history-room-stu`;
    const data = {
      mssv,
    };
    return axiosClient.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  GetStuInRoom(
    data: {
      hocki: string;
      phong: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/student/get-stu-in-room`;
    return axiosClient.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  deactivate(
    data: {
      mssv: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/student/deactive_student`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.put(url, data, { headers });
  },
  activate(
    data: {
      mssv: string;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/student/active_student`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.put(url, data, { headers });
  },
};
