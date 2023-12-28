import axios from 'axios';
import getLocalToken from './token';

const axiosClient = axios.create({
  headers: {
    'access-control-allow-origin': '*',
    Accept: 'application/json',
    'content-type': 'application/json',
    Pragma: 'no-cache',
  },
});

// axiosClient.interceptors.request.use((config: any) => {
//   const token = getLocalToken()
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

axiosClient.interceptors.response.use((response: any) => {
  // TODO: handle expired token
  return response;
});

export default axiosClient;
