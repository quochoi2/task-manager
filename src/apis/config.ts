import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

// Tạo instance axios
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

interface QueueItem {
  resolve: (value: unknown) => void
  reject: (reason?: any) => void
}

let isRefreshing = false
let failedQueue: QueueItem[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Hàm refresh token
const refreshToken = async (): Promise<string> => {
  try {
    const accessToken = localStorage.getItem('token')
    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await apiClient.post<{ accessToken: string }>('/auth/refresh-token', {
      accessToken
    })

    const newAccessToken = response.data.accessToken
    localStorage.setItem('token', newAccessToken)

    return newAccessToken
  } catch (error) {
    // Xử lý khi refresh token thất bại
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
    throw error
  }
}

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh token, thêm request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token: any) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const newToken = await refreshToken()

        // Cập nhật header với token mới
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        // Xử lý các request trong hàng đợi
        processQueue(null, newToken)

        // Thử lại request gốc
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Nếu refresh token thất bại
        processQueue(refreshError, null)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// Interface cho API response cơ bản
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
}

// Hàm helper cho API calls với type safety
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => apiClient.get<T>(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post<T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put<T>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete<T>(url, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch<T>(url, data, config)
}

export default apiClient
