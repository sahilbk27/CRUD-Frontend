// src/api/customers.js
import apiClient from './client'
export const getCustomers = () => apiClient.get('/customers')
export const createCustomer = (data) => apiClient.post('/customers', data)
export const updateCustomer = (id, data) => apiClient.put(`/customers/${id}`, data)
export const deleteCustomer = (id) => apiClient.delete(`/customers/${id}`)