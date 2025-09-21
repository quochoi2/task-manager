import axios from 'axios';
import { queryClient } from '../lib/react-query';

const API_BASE_URL = 'http://localhost:8080/api';

// Tạo instance axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Hàm refresh token
const refreshToken = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await apiClient.post('/auth/refresh-token', {
      accessToken
    });

    const newAccessToken = response.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    // Xử lý khi refresh token thất bại
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/';
    throw error;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        // Nếu đang refresh token, thêm request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();

        // Cập nhật header với token mới
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Xử lý các request trong hàng đợi
        processQueue(null, newToken);

        // Thử lại request gốc
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Hàm helper cho API calls
export const api = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
  patch: (url, data, config = {}) => apiClient.patch(url, data, config),
};

export default apiClient;