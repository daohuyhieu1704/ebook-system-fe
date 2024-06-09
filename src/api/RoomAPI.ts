import axios from "axios";
import { LOCAL_STORAGE_ITEM } from "../constants/common";
import axiosClient from "../helper/axios/axiosClient";

export const RoomAPI = {
  getAll(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room/get_room_inf`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  create(
    data: {
      room_id: string;
      cost: number;
      type: number;
      total: number;
      gender: number;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room/create_room`;
    return axiosClient.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  update(
    data: {
      room_id: string;
      cost: string;
      type: number;
      total: number;
      gender: number;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room/update_room`;
    return axiosClient.put(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
