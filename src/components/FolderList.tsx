import React from 'react'
import { useNavigate } from 'react-router-dom'

// Dummy data cho danh sách folder
const folders = [
  { id: 1, name: 'Documents' },
  { id: 2, name: 'Photos' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' },
  { id: 3, name: 'Projects' }
]

const FolderList: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = (id: number) => {
    navigate(`/detail/${id}`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="flex items-center gap-2 p-4 bg-white rounded-lg shadow hover:bg-gray-50 cursor-pointer transition"
          onClick={() => handleClick(folder.id)}
        >
          <span role="img" aria-label="folder" className="text-2xl">
            📁
          </span>
          <span className="font-medium">{folder.name}</span>
        </div>
      ))}
    </div>
  )
}

export default FolderList
