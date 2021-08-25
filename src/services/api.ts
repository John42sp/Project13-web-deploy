
import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
    baseURL: "https://project13-server-deploy.herokuapp.com",

});



api.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;
