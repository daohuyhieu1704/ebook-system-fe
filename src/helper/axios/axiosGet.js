import axiosClient from "./axiosClient";

const AxiosGet = async (url, params = {}) => {
  try {
    const response = await axiosClient.get(url, { params });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default AxiosGet;
