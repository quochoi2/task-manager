import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth()

  // Hiển thị trạng thái loading trong lúc kiểm tra
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl">Đang kiểm tra...</div>
      </div>
    )
  }

  // Nếu chưa đăng nhập, hiển thị thông báo
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cần đăng nhập</h2>
            <p className="text-gray-600 mb-6">
              Vui lòng đăng nhập bằng Google để tiếp tục sử dụng ứng dụng.
            </p>
            <div className="text-sm text-gray-500">
              Sử dụng nút đăng nhập ở góc trên bên phải để đăng nhập.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Nếu đã đăng nhập, hiển thị toàn bộ layout
  return (
    <div className="flex flex-col min-h-screen h-screen bg-gray-50 overflow-hidden">
      <Header />
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 container mx-auto px-8 py-4 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout