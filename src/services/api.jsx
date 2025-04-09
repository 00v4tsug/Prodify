import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const loginUser = (credentials) => axios.post(`${API}/auth/`, credentials);

export const getTasks = (token) =>
  axios.get(`${API}/tasks/`, {
    headers: { Authorization: `Token ${token}` },
  });

export const createTask = (task, token) =>
  axios.post(`${API}/tasks/`, task, {
    headers: { Authorization: `Token ${token}` },
  });

export const updateTask = (id, task, token) =>
  axios.put(`${API}/tasks/${id}/`, task, {
    headers: { Authorization: `Token ${token}` },
  });

export const deleteTask = (id, token) =>
  axios.delete(`${API}/tasks/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
