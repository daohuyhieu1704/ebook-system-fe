import axios from 'axios';
import axiosClient from '../helper/axios/axiosClient';

export const TimeRegisterAPI = {
    getAll(token: string) {
        const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room/get_regist_time`;
        return axiosClient.get(url, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    },
};
