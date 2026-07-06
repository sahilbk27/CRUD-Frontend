import client from "./client";

export const getAllOrders = () => client.get("/orders");

export const getOrderById = (id) => client.get(`/orders/${id}`);

export const createOrder = (order) => client.post("/orders", order);

export const updateOrder = (id, order) => client.put(`/orders/${id}`, order);

export const deleteOrder = (id) => client.delete(`/orders/${id}`);

export const searchOrders = (keyword) =>
  client.get("/orders/search", { params: { keyword } });
