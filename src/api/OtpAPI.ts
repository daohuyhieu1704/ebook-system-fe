import axiosClient from "../helper/axios/axiosClient";

export const OtpAPI = {
  getAllMaterialFacility(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/material-facility/get-all-material-facilities`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getMaterialFacility(id: string, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/material-facility/get-material-facility`;
    return axiosClient.post(
      url,
      {
        id: id,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },
  getAllRoomFacility(token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room-facility/get-all-room-facilities`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  createRoomFacility(
    data: {
      id_phong: string;
      id_csvc: string;
      soluong: number;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room-facility/create-room-facility`;
    return axiosClient.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  createMatFacility(
    data: {
      ten: string;
      mota: string;
      tonkho: number;
      gia: number;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/material-facility/create-material-facility`;
    return axiosClient.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  updateMatFacility(
    data: {
      id: string;
      ten: string;
      mota: string;
      tonkho: number;
      gia: number;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/material-facility/update-material-facility`;
    return axiosClient.put(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  updateRoomFacility(
    data: {
      id_phong: string;
      id_csvc: string;
      soluong: number;
    },
    token: string
  ) {
    const url = `${process.env.REACT_APP_ENDPOINT}emp_role/room-facility/update-room-facility`;
    return axiosClient.put(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
