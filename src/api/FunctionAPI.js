import axios from "axios";

export const FunctionAPI = {
  getAll(token) {
    const url = `${process.env.REACT_END_POINT}api/function`;
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios({
      method: "GET",
      url: url,
      headers: header,
    });
  },
};
