import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Task APIs
export const taskAPI = {
  getTasks: async () => {
    try {
      const response = await api.get('/tasks');
      const data = response.data.tasks || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      return [];
    }
  },
  
  generateTasks: async (transcript: string) => {
    const response = await api.post('/tasks/generate', { transcript });
    const data = response.data.tasks || response.data;
    return Array.isArray(data) ? data : [];
  },
  
  updateTask: async (id: string, updates: any) => {
    const response = await api.patch(`/tasks/${id}`, updates);
    return response.data;
  },
  
  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
  
  deleteAllTasks: async () => {
    const response = await api.delete('/tasks');
    return response.data;
  },
  
  exportTasks: async () => {
    const response = await api.get('/tasks/export', {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
