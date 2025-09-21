import React from 'react'
import ProjectList from '../components/ProjectList'

const HomePage: React.FC = () => {
  return (
    <div className="flex bg-gray-50">
      <div className="w-full">
        <ProjectList />
      </div>
    </div>
  )
}

export default HomePage
