import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Không retry khi lỗi 401 (unauthorized)
        if (error?.response?.status === 401) {
          return false
        }
        return failureCount < 3
      },
      staleTime: 5 * 60 * 1000 // 5 minutes
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error?.response?.status === 401) {
          return false
        }
        return failureCount < 3
      }
    }
  }
})
