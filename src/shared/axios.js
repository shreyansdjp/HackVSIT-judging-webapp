import Axios from "axios";
import { getAuthInfo, clearAuthInfo } from "./helpers";

const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASEURL
});

// request interceptor to add the token
axios.interceptors.request.use(request => {
  const authInfo = getAuthInfo();
  if (authInfo) {
    request.headers["Authorization"] = "Bearer " + authInfo.token;
    request.headers["Content-Type"] = "application/json";
  }
  return request;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      if (getAuthInfo()) {
        clearAuthInfo();
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
