import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo de errores unificado
const handleError = (error) => {
  console.error('API Error:', error.response?.data || error.message);
  throw error.response?.data || error;
};

// ===== AUTH =====
export const loginUser = (credentials) => api.post('/api/auth/login', credentials);
export const registerUser = (userData) => api.post('/api/auth/register', userData);

// ===== REFUGIOS =====
export const fetchAllRefugios = (search = '') =>
  api.get(`/api/refugios?search=${encodeURIComponent(search)}`).catch(handleError);

export const fetchRefugioById = (id) =>
  api.get(`/api/refugios/${id}`).catch(handleError);

export const createRefugio = (refugioData) =>
  api.post('/api/refugios', refugioData).catch(handleError);

export const updateRefugio = (id, refugioData) =>
  api.put(`/api/refugios/${id}`, refugioData).catch(handleError);

export const deleteRefugio = (id) =>
  api.delete(`/api/refugios/${id}`).catch(handleError);

export const fetchMisRefugios = () =>
  api.get('/api/refugios/yo').catch(handleError);

// ===== MASCOTAS =====
export const getAllMascotas = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  return api.get(`/api/mascotas?${params.toString()}`).catch(handleError);
};

export const getMascotaById = (id) =>
  api.get(`/api/mascotas/${id}`).catch(handleError);

export const createMascota = (mascotaData) =>
  api.post('/api/mascotas', mascotaData).catch(handleError);

export const updateMascota = (id, mascotaData) =>
  api.put(`/api/mascotas/${id}`, mascotaData).catch(handleError);

export const deleteMascota = (id) =>
  api.delete(`/api/mascotas/${id}`).catch(handleError);

export const getMascotasByRefugio = (refugioId) =>
  api.get(`/api/mascotas?refugio=${refugioId}`).catch(handleError);

// ===== SOLICITUDES =====
// Adopción
export const createAdoptionRequest = (data) =>
  api.post('/api/solicitudes/adopcion', data).catch(handleError);

export const getAdoptionRequestsByUser = () =>
  api.get('/api/solicitudes/adopcion/usuario').catch(handleError);

export const getAdoptionRequestsByRefugio = () =>
  api.get('/api/solicitudes/adopcion/refugio').catch(handleError);

export const updateAdoptionRequest = (id, estado) =>
  api.patch(`/api/solicitudes/adopcion/${id}`, { estado }).catch(handleError);

// Dar en adopción
export const createGiveAdoptionRequest = (data) =>
  api.post('/api/solicitudes/dar-en-adopcion', data).catch(handleError);

export const getGiveAdoptionRequestsByUser = () =>
  api.get('/api/solicitudes/dar-en-adopcion/usuario').catch(handleError);

export const getGiveAdoptionRequestsByRefugio = () =>
  api.get('/api/solicitudes/dar-en-adopcion/refugio').catch(handleError);

export const updateGiveAdoptionRequest = (id, estado) =>
  api.patch(`/api/solicitudes/dar-en-adopcion/${id}`, { estado }).catch(handleError);

export default api;