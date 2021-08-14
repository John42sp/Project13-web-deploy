import axios from 'axios';
import { getToken } from "./auth";

const apiFile = axios.create({
    baseURL: "https://project13-server-deploy.herokuapp.com",
    headers: {
      'content-type': 'multipart/form-data',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },

});



apiFile.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default apiFile;
