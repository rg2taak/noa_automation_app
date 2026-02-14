import api from './api';

export const deviceService = {
  getAll: () => api.get('/admin/devices'),
  getById: (id: string) => api.get(`/admin/devices/${id}`),
  create: (data: any) => api.post('/admin/devices', data),
  update: (id: string, data: any) => api.patch(`/admin/devices/${id}`, data),
  delete: (id: string) => api.delete(`/admin/devices/${id}`),
};

export default deviceService;
