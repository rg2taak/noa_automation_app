
import api from './api';

export const customerService = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.patch(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
  setPassword: (id: string, data: { password: string }) =>
    api.patch(`/users/${id}/set-password`, data),
  getPurchases: (id: string) => api.get('/orders', { params: { userId: id } }),
};

export default customerService;
