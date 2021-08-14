// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:3333',
// })

// export default api;

import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
    baseURL: "https://project13-server-deploy.herokuapp.com/",
    headers: {
      'content-type': 'application/json', 
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',                   
  },

});



api.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;
