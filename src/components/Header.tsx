import React, { useState, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import NotificationButton from './NotificationButton'
import MessageButton from './MessageButton'
// import UserButton from './UserButton'

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

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
      setIsLoggedIn(true)
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      alert('Đăng nhập thất bại: ' + (error.response?.data?.message || error.message))
    }
  })

  const onSuccess = (credentialResponse: any) => {
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
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    console.log('Logged out')
  }

  return (
    <header className="bg-white shadow py-4 px-10 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Quản lý</h1>
        <div className="flex items-center space-x-4">
          {/* Chỉ hiển thị các nút thông báo, tin nhắn khi đã đăng nhập */}
          {isLoggedIn && (
            <>
              <NotificationButton />
              <MessageButton />
            </>
          )}

          {/* Phần đăng nhập */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <img src={user?.image || '/default-avatar.png'} alt="User avatar" className="w-8 h-8 rounded-full" />
              <span className="text-sm">{user?.username || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div>
              {loginMutation.isPending ? (
                <div className="text-sm">Đang đăng nhập...</div>
              ) : (
                <GoogleLogin
                  onSuccess={onSuccess}
                  onError={onError}
                  theme="filled_blue"
                  text="signin"
                />
              )}

              {loginMutation.isError && (
                <div className="text-red-500 text-sm mt-1">Lỗi đăng nhập</div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header