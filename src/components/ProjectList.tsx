import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProject'

const ProjectList: React.FC = () => {
  const navigate = useNavigate()
  const { data: projects, isLoading, error } = useProjects();

  const handleClick = (id: number) => {
    navigate(`/detail/${id}`)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-4 bg-white rounded-lg shadow animate-pulse"
          >
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">Error loading projects: {(error as Error).message}</p>
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📁</div>
        <p className="text-gray-500 text-lg">No projects found</p>
        <p className="text-gray-400">Create your first project to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map((project: any) => (
        <div
          key={project.id}
          className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition-all duration-200 hover:bg-gray-50 border border-gray-100"
          onClick={() => handleClick(project.id)}
        >
          <div className="flex items-center gap-3 mb-3">
            <span role="img" aria-label="project" className="text-2xl">
              {project.archived ? '📦' : '📁'}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {project.description || 'No description'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${project.role === 'owner'
              ? 'bg-purple-100 text-purple-800'
              : project.role === 'admin'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
              }`}>
              {project.role}
            </span>

            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${project.status === 'active'
              ? 'bg-green-100 text-green-800'
              : project.status === 'completed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
              }`}>
              {project.status}
            </span>
          </div>

          {project.isPublic && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                🌐 Public
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProjectList