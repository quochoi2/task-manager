import React from 'react';

// Dummy data cho danh sách folder
const folders = [
  { id: 1, name: 'Documents' },
  { id: 2, name: 'Photos' },
  { id: 3, name: 'Projects' },
];

const FolderList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {folders.map(folder => (
        <div key={folder.id} className="flex items-center gap-2 p-4 bg-white rounded-lg shadow hover:bg-gray-50 cursor-pointer transition">
          <span role="img" aria-label="folder" className="text-2xl">📁</span>
          <span className="font-medium">{folder.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FolderList;
