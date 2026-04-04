import api from './api';

const generationService = {
  generateCode: async (projectId, prompt) => {
    const response = await api.post(`/generate/${projectId}`, { prompt });
    return response.data.data;
  },
};

export default generationService;
