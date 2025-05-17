import axios from 'axios';

const API = axios.create({ baseURL: 'https://localhost:5001/' });
API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers!['Authorization'] = `Bearer ${token}`;
    return config;
});

export const AuthApi = {
    register: (data: { username: string; email: string; password: string }) => API.post('/api/auth/register', data),
    login: (data: { username: string; password: string }) => API.post('/api/auth/login', data),
    current: () => API.get('/api/auth/current')
};
export const NotesApi = {
    getAll: (params?: any) => API.get('/api/notes', { params }),
    get: (id: number) => API.get(`/api/notes/${id}`),
    create: (note: any) => API.post('/api/notes', note),
    update: (id: number, note: any) => API.put(`/api/notes/${id}`, note),
    delete: (id: number) => API.delete(`/api/notes/${id}`)
};
export const CategoryApi = {
    getAll: () => API.get('/api/categories'),
    create: (data: any) => API.post('/api/categories', data),
    update: (id: number, data: any) => API.put(`/api/categories/${id}`, data),
    delete: (id: number) => API.delete(`/api/categories/${id}`)
};
export const TagApi = {
    getAll: () => API.get('/api/tags'),
    create: (data: any) => API.post('/api/tags', data),
    update: (id: number, data: any) => API.put(`/api/tags/${id}`, data),
    delete: (id: number) => API.delete(`/api/tags/${id}`)
};
export const HistoryApi = {
    getByNote: (noteId: number) => API.get(`/api/history/${noteId}`)
};