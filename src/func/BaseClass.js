import axios from "axios";
const token = localStorage.getItem("token") || "";
const API = "https://api.realworld.io/api";

export class BaseClass {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  get = async (path) => {
    const res = await axios({
      method: "GET",
      url: `${API}/${path}`,
      headers: { Authorization: `Token ${token}` },
    });
    console.log("dsa", res);
    return res;
  };

  post = (path, data) => {
    return axios({
      method: "post",
      url: `${API}/${path}`,
      data: data,
      headers: { Authorization: `Token ${token}` },
    });
  };

  put = (path, data) => {
    return axios({
      method: "put",
      url: `${API}/${path}`,
      data: data,
      headers: { Authorization: `Token ${token}` },
    });
  };

  delete = (path) => {
    return axios({
      method: "post",
      url: `${API}/${path}`,
      headers: { Authorization: `Token ${token}` },
    });
  };
}
