import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow py-4 px-10 text-center text-gray-500 mt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 container mx-auto">
        <div>© {new Date().getFullYear()} My App</div>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:underline">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:underline">
            Điều khoản sử dụng
          </a>
          <a href="mailto:@nguyenquochoibacninh@gmail.com" className="hover:underline">
            Liên hệ: nguyenquochoibacninh@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
