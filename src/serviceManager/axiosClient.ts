import axios from 'axios';
import { Logger } from '@/utils/logger';

export const axiosClient = axios.create({
  baseURL: 'http://13.127.225.44:8097',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    Logger.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, Logger.redact(config.data));
    return config;
  },
  (error) => {
    Logger.error('API Request Error', error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    Logger.log(`API Response Status: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    Logger.error('API Response Error', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
