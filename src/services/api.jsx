import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const loginUser = (credentials) => API.post("auth/", credentials);

export const getTasks = (token) =>
  API.get("tasks/", {
    headers: { Authorization: `Token ${token}` },
  });

export const createTask = (task, token) =>
  API.post("tasks/", task, {
    headers: { Authorization: `Token ${token}` },
  });

export const updateTask = (id, task, token) =>
  API.put(`tasks/${id}/`, task, {
    headers: { Authorization: `Token ${token}` },
  });

export const deleteTask = (id, token) =>
  API.delete(`tasks/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
