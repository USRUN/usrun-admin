import axios from 'axios';
import AuthenticationService from 'services/AuthenticationService';

const instance = axios.create({
  baseURL: 'http://localhost:8080/admin',
});

instance.interceptors.request.use(function (config) {
  if(config.url === "/user/login") return config;

  const token = AuthenticationService.authHeader()['Authorization'];
  config.headers.Authorization =  token;

  return config;
});

export default instance;