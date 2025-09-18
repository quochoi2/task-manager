import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { label: 'Trang chủ', icon: '🏠', to: '/' },
  { label: 'Drive của tôi', icon: '🗂️', to: '/drive' },
  { label: 'Được chia sẻ với tôi', icon: '👤', to: '/shared' },
  { label: 'Có gắn dấu sao', icon: '⭐', to: '/starred' },
  { label: 'Thùng rác', icon: '🗑️', to: '/trash' },
  { label: 'Bộ nhớ', icon: '☁️', to: '/storage' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="bg-gray-50 p-4 rounded-xl w-64 flex flex-col gap-2 shadow">
      <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow mb-4 font-medium hover:bg-gray-100 transition">
        <span className="text-xl">＋</span> Mới
      </button>
      <nav className="flex flex-col gap-1">
        {sidebarItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
              ${location.pathname === item.to ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
