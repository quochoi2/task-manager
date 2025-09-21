import api from './config'
import { type ApiResponse } from './config'

export interface Project {
  id: number
  name: string
  description: string | null
  createdBy: number
  createdAt: string
  updatedAt: string
  status: 'active' | 'inactive' | 'completed' | 'archived'
  isPublic: boolean
  inviteToken: string | null
  archived: boolean
  role: 'owner' | 'admin' | 'member'
}

export interface ProjectsResponse extends ApiResponse {
  count: number
  projects: Project[]
}

export interface ProjectResponse extends ApiResponse {
  project?: Project
  data?: Project
}

export const projectApi = {
  // Lấy tất cả projects của user
  getAllProjects: (): Promise<ProjectsResponse> => {
    return api.get<ProjectsResponse>('/projects').then((res: any) => res.data)
  },

  // Lấy project theo ID
  getProjectById: (id: number): Promise<ProjectResponse> => {
    return api.get<ProjectResponse>(`/projects/${id}`).then((res: any) => res.data)
  },

  // Tạo project mới
  createProject: (projectData: Partial<Project>): Promise<ProjectResponse> => {
    return api.post<ProjectResponse>('/projects', projectData).then((res: any) => res.data)
  },

  // Cập nhật project
  updateProject: (id: number, projectData: Partial<Project>): Promise<ProjectResponse> => {
    return api.put<ProjectResponse>(`/projects/${id}`, projectData).then((res: any) => res.data)
  },

  // Xóa project
  deleteProject: (id: number): Promise<ApiResponse> => {
    return api.delete<ApiResponse>(`/projects/${id}`).then((res: any) => res.data)
  },

  // Lọc projects
  getProjectsWithFilters: (filters: { archived?: boolean; status?: string } = {}): Promise<ProjectsResponse> => {
    const params = new URLSearchParams()

    if (filters.archived !== undefined) {
      params.append('archived', filters.archived.toString())
    }

    if (filters.status) {
      params.append('status', filters.status)
    }

    return api.get<ProjectsResponse>(`/projects?${params.toString()}`).then((res: any) => res.data)
  }
}

export default projectApi
