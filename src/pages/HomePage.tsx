import React from 'react'
import FolderList from '../components/FolderList'

const HomePage: React.FC = () => {
  return (
    <div className="flex bg-gray-50">
      <div className="w-full">
        <FolderList />
      </div>
    </div>
  )
}

export default HomePage
