import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null)

  // Mutation để gửi token Google lên backend
  const loginMutation = useMutation({
    mutationFn: async (googleToken: string) => {
      const response = await axios.post('http://localhost:8080/api/auth/google', {
        token: googleToken
      })
      return response.data
    },
    onSuccess: (data) => {
      console.log('Login success:', data)
      setUser(data.user)
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      alert('Đăng nhập thất bại: ' + (error.response?.data?.message || error.message))
    }
  })

  const onSuccess = (credentialResponse: any) => {
    // console.log('Google login success:', credentialResponse);

    if (credentialResponse.credential) {
      // Gửi token Google lên backend
      loginMutation.mutate(credentialResponse.credential)
    }
  }

  const onError = () => {
    console.log('Google login failed')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    console.log('Logged out')
  }

  return (
    <header className="bg-white shadow py-4 px-10 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Quản lý</h1>
        <div className="flex items-center space-x-4">
          {/* Các nút thông báo và tin nhắn */}
          <button
            title="Notifications"
            className="text-xl hover:text-blue-500 cursor-pointer p-1 rounded"
            style={{ lineHeight: 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>

          <button
            title="Messages"
            className="text-xl hover:text-blue-500 cursor-pointer p-1 rounded"
            style={{ lineHeight: 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          </button>

          {/* Phần đăng nhập */}
          {user ? (
            <div className="flex items-center space-x-2">
              <img src={user.image} alt="User avatar" className="w-8 h-8 rounded-full" />
              <span className="text-sm">{user.username}</span>
              <button onClick={handleLogout} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                Đăng xuất
              </button>
            </div>
          ) : (
            <div>
              {loginMutation.isPending ? (
                <div className="text-sm">Đang đăng nhập...</div>
              ) : (
                <GoogleLogin onSuccess={onSuccess} onError={onError} theme="filled_blue" text="signin" />
              )}

              {loginMutation.isError && <div className="text-red-500 text-sm mt-1">Lỗi đăng nhập</div>}
            </div>
          )}
        </div>
      </div>

      {/* Debug info - chỉ hiển thị trong development */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 p-2 bg-gray-100 text-xs">
          <strong>Debug Info:</strong><br />
          User: {user ? JSON.stringify(user) : 'Chưa đăng nhập'}<br />
          Mutation Status: {loginMutation.status}<br />
          Error: {loginMutation.error ? loginMutation.error.message : 'None'}
        </div>
      )} */}
    </header>
  )
}

export default Header
