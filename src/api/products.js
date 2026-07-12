// src/api/products.js
import apiClient from './client'
export const getProducts = () => apiClient.get('/products')
export const createProduct = (data) => apiClient.post('/products', data)
export const updateProduct = (id, data) => apiClient.put(`/products/${id}`, data)
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`)