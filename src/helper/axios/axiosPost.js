import axiosClient from './axiosClient';

const AxiosPost = async (url: string, data: any, params = {}) => {
  try {
    const response = await axiosClient.post(url, JSON.stringify(data), {
      params,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default AxiosPost;
