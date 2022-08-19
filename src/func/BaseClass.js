import axios from "axios";

const API = "https://api.realworld.io/api";
export class BaseClass {
  constructor() {}
  get = (path) => {
    const token = localStorage.getItem("token") || "";
    return axios({
      method: "GET",
      url: `${API}/${path}`,
      headers: { Authorization: `Token ${token}` },
    });
  };

  post = (path, data) => {
    const token = localStorage.getItem("token") || "";
    return axios({
      method: "post",
      url: `${API}/${path}`,
      data: data,
      headers: { Authorization: `Token ${token}` },
    });
  };

  put = (path, data) => {
    const token = localStorage.getItem("token") || "";
    return axios({
      method: "put",
      url: `${API}/${path}`,
      data: data,
      headers: { Authorization: `Token ${token}` },
    });
  };

  delete = (path) => {
    const token = localStorage.getItem("token") || "";
    return axios({
      method: "delete",
      url: `${API}/${path}`,
      headers: { Authorization: `Token ${token}` },
    });
  };
}
