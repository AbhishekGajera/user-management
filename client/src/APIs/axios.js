import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = (url = "", method, data = {}) => {
  const options = {
    method,
    headers: {
      "content-type": "application/json",
      "x-access-token": `${localStorage.getItem("token")}`,
    },
    data,
    url: `${baseURL}/${url}`,
  };
  return axios(options);
};

export default api;

const multipartApi = (url = "", method, data = {}) => {
  const options = {
    method,
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": `${localStorage.getItem("token")}`,
    },
    data,
    url: `${baseURL}/${url}`,
  };
  return axios(options);
};

export { multipartApi };
