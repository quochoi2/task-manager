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

export interface ProjectResponse {
  success: boolean
  data?: Project
  message?: string
  project?: Project
}

export interface ProjectsResponse {
  success: boolean
  count: number
  projects: Project[]
  message?: string
}
