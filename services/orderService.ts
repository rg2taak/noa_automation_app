import api from './api';

export const orderService = {
  getAll: (params?: Record<string, any>) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  delete: (id: string) => api.delete(`/orders/${id}`),
};

export default orderService;
