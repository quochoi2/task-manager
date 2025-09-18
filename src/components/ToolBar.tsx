import React from 'react';

const ToolBar: React.FC = () => {
  return (
    <div className="flex gap-2 bg-gray-100 p-4 rounded-lg shadow">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">New Folder</button>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Upload</button>
      {/* Thêm các nút khác nếu cần */}
    </div>
  );
};

export default ToolBar;
