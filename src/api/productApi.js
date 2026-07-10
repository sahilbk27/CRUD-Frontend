import client from "./client";

export const getProducts = () => client.get("/products");

export const createCustomer = (data) =>
    client.post("/products", data);

export const updateCustomer = (id, data) =>
    client.put(`/products/${id}`, data);

export const deleteCustomer = (id) =>
    client.delete(`/products/${id}`);