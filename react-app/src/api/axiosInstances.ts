import axios from 'axios';

const createInstance = (baseURL: string) => {
  const instance = axios.create({ baseURL });
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return instance;
};

export const laravelApi = createInstance('http://localhost:8000/api');
export const nestApi = createInstance('http://localhost:3000');