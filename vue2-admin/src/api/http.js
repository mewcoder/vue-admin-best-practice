import axios from 'axios';

const http = axios.create({
  timeout: 180000,
  withCredentials: true
});

export default http;

http.interceptors.response.use(config => {
  return config.data;
});
