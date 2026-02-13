
import api from './api';

export const customerService = {
  getAll: () => api.get('/customers'),
  getById: (id: number) => api.get(`/customers/${id}`),
  create: (data: any) => api.post('/customers', data),
  update: (id: number, data: any) => api.put(`/customers/${id}`, data),
  delete: (id: number) => api.delete(`/customers/${id}`),
  getPurchases: (id: number) => api.get(`/customers/${id}/purchases`),
};

export default customerService;
