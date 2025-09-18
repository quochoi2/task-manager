import React from 'react';
import ToolBar from '../components/ToolBar';
import FolderList from '../components/FolderList';
import Sidebar from '../components/Sidebar';

const HomePage: React.FC = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="flex-1 p-8">
        <ToolBar />
        <div className="mt-6">
          <FolderList />
        </div>
      </main>
    </div>
  );
}

export default HomePage
