import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import NotificationButton from './NotificationButton'
import MessageButton from './MessageButton'
import UserButton from './UserButton'

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
          {/* Các nút thông báo, tin nhắn, bạn bè */}
          <NotificationButton />
          {/* Sử dụng với dữ liệu mặc định
          <NotificationButton />

          Hoặc truyền dữ liệu từ props
          <NotificationButton 
            initialUnreadCount={5}
            notifications={yourTaskNotificationsArray}
          /> */}

          {/* --- */}
          <MessageButton />
          {/* Sử dụng với dữ liệu mặc định
          <MessageButton />

          Hoặc truyền dữ liệu từ props
          <MessageButton 
            initialUnreadCount={5}
            messages={yourMessagesArray}
          /> */}

          {/* --- */}
          <UserButton />
          {/* Sử dụng với dữ liệu mặc định
          <UserButton />

          Hoặc truyền dữ liệu từ props
          <UserButton 
            friendRequests={yourFriendRequestsArray}
            friends={yourFriendsArray}
          /> */}

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
