import api from './api';

const generationService = {
  generateCode: async (prompt) => {
    const response = await api.post('/generate', { prompt });
    return response.data;
  },
  refineCode: async (projectId, refinement) => {
    const response = await api.post(`/generate/${projectId}/refine`, { refinement });
    return response.data;
  },
};

export default generationService;
