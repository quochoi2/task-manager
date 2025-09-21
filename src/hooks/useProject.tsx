import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '../apis/projectApi';
import type { Project, ProjectsResponse, ProjectResponse } from '../apis/projectApi';

// Query keys
export const PROJECT_KEYS = {
  all: ['projects'] as const,
  lists: () => [...PROJECT_KEYS.all, 'list'] as const,
  list: (filters: any) => [...PROJECT_KEYS.lists(), filters] as const,
  details: () => [...PROJECT_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...PROJECT_KEYS.details(), id] as const,
};

// Hook để lấy danh sách projects
export const useProjects = (filters: { archived?: boolean; status?: string } = {}) => {
  return useQuery<ProjectsResponse, Error, Project[]>({
    queryKey: PROJECT_KEYS.list(filters),
    queryFn: () => projectApi.getAllProjects(),
    select: (data) => data.projects,
  });
};

// Hook để lấy project by id
export const useProject = (id: number) => {
  return useQuery<ProjectResponse, Error>({
    queryKey: PROJECT_KEYS.detail(id),
    queryFn: () => projectApi.getProjectById(id),
    enabled: !!id,
  });
};

// Hook để tạo project mới
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ProjectResponse, Error, Partial<Project>>({
    mutationFn: projectApi.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
};