import api from './api';

const projectService = {
  getAllProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },
  renameProject: async (projectId, newName) => {
    const response = await api.patch(`/projects/${projectId}`, { name: newName });
    return response.data;
  },
  deleteProject: async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  },
};

export default projectService;
