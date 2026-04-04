import api from './api';

const projectService = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data.data;
  },
  getProject: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data.data;
  },
  createProject: async (title) => {
    const response = await api.post('/projects', { title });
    return response.data.data;
  },
  updateProject: async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data.data;
  },
  restoreVersion: async (id, versionIndex) => {
    const response = await api.post(`/projects/${id}/restore-version`, { versionIndex });
    return response.data.data;
  },
  enableSharing: async (id) => {
    const response = await api.post(`/projects/${id}/share`);
    return response.data.data;
  },
  getPublicProject: async (shareId) => {
    const response = await api.get(`/public/${shareId}`); // Adjust according to `index.js` proxying if it fails, but proxy is typical for `/api`. Assuming api.get prepends `/api`. Wait, the client base URL is `/api`.
    return response.data.data;
  },
};

export default projectService;
