import axiosClient from './axiosClient';

const AxiosDelete = async (url: string, params = {}, data = {}) => {
  try {
    const response = await axiosClient.delete(url, { params, data });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default AxiosDelete;
