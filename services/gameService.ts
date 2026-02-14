
import api from './api';

export const gameService = {
  getAll: () => api.get('/admin/games'),
  getById: (id: string) => api.get(`/admin/games/${id}`),
  create: (data: any) => api.post('/admin/games', data),
  update: (id: string, data: any) => api.patch(`/admin/games/${id}`, data),
  delete: (id: string) => api.delete(`/admin/games/${id}`),
};

export default gameService;
