import axios from 'axios';
import { Logger } from '@/utils/logger';
import { useDebugLogStore } from '@/store/useDebugLogStore';
import { storage, StorageKeys } from '@/utils/storage';

export const axiosClient = axios.create({
  baseURL: 'http://13.127.225.44:8097',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config: any) => {
    Logger.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, Logger.redact(config.data));
    
    // Attach authorization token if present
    const token = storage.getString(StorageKeys.AUTH_TOKEN);
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    const startTime = Date.now();
    const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
    const headers = config.headers as Record<string, string>;

    const logId = useDebugLogStore.getState().addLog({
      method: config.method?.toUpperCase() || 'GET',
      url: config.url || '',
      fullUrl,
      headers,
      requestData: config.data,
    });

    config.metadata = { logId, startTime };
    return config;
  },
  (error) => {
    Logger.error('API Request Error', error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: any) => {
    Logger.log(`API Response Status: ${response.status}`, response.data);
    
    const metadata = response.config?.metadata;
    if (metadata) {
      const { logId, startTime } = metadata;
      const duration = Date.now() - startTime;
      useDebugLogStore.getState().updateLog(logId, {
        status: response.status,
        responseData: response.data,
        duration,
      });
    }

    return response;
  },
  (error) => {
    Logger.error('API Response Error', error.response?.data || error.message);
    
    const metadata = error.config?.metadata;
    if (metadata) {
      const { logId, startTime } = metadata;
      const duration = Date.now() - startTime;
      useDebugLogStore.getState().updateLog(logId, {
        status: error.response?.status || 500,
        responseData: error.response?.data,
        error: error.message,
        duration,
      });
    }

    return Promise.reject(error);
  }
);
