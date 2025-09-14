import React from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <header className='bg-white shadow py-4 px-10'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Task Manager</h1>
          <div className='flex items-center space-x-4'>
            <button
              title='Notifications'
              className='text-xl hover:text-blue-500 cursor-pointer p-1 rounded'
              style={{ lineHeight: 0 }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                />
              </svg>
            </button>
            <button
              title='Messages'
              className='text-xl hover:text-blue-500 cursor-pointer p-1 rounded'
              style={{ lineHeight: 0 }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z'
                />
              </svg>
            </button>
            <button
              title='User'
              className='text-xl hover:text-blue-500 cursor-pointer p-1 rounded'
              style={{ lineHeight: 0 }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main className='flex-1 container mx-auto px-8 py-4'>{children}</main>
      <footer className='bg-white shadow py-4 px-10 text-center text-gray-500'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-2 container mx-auto'>
          <div>© {new Date().getFullYear()} My App</div>
          <div className='flex flex-wrap gap-4'>
            <a href='#' className='hover:underline'>
              Chính sách bảo mật
            </a>
            <a href='#' className='hover:underline'>
              Điều khoản sử dụng
            </a>
            <a href='mailto:contact@myapp.com' className='hover:underline'>
              Liên hệ: contact@myapp.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
