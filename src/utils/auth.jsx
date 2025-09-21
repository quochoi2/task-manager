// Helper functions for token management
export const authUtils = {
  // Lấy token từ localStorage
  getToken: () => {
    return localStorage.getItem('accessToken')
  },

  // Lưu token vào localStorage
  setToken: (token) => {
    localStorage.setItem('accessToken', token)
  },

  // Xóa token
  removeToken: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  },

  // Kiểm tra token có hết hạn không
  isTokenExpired: (token) => {
    if (!token) return true

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const exp = payload.exp * 1000 // Convert to milliseconds
      return Date.now() >= exp
    } catch (error) {
      return true
    }
  },

  // Lấy thông tin user từ token
  getUserFromToken: (token) => {
    if (!token) return null

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return {
        userId: payload.userId || payload.id,
        email: payload.email,
        exp: payload.exp
      }
    } catch (error) {
      return null
    }
  }
}
