import { LOCAL_STORAGE_ITEM } from "../constants/common";
import axiosClient from "../helper/axios/axiosClient";

const token = localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
export const DashboardAPI = {
  getTotalSVCV() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/num_stu_and_emp`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getCurrentSemester() {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/semester/get_curr_semester`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
