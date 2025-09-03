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

const handleError = (error) => {
  return { 
    data: null, 
    error: error.response?.data?.message || error.message 
  };
};

// Obtener refugio por ID desde el listado
export const fetchRefugioById = async (id) => {
  try {
    const response = await api.get('/refugios');
    const refugios = response.data || [];
    const refugio = refugios.find(r => r._id === id || r.id === id);
    
    if (!refugio) {
      return { data: null, error: 'Refugio no encontrado' };
    }
    
    return { data: refugio };
  } catch (error) {
    return handleError(error);
  }
};

// Resto de endpoints sin cambios
export const fetchAllRefugios = (search = '') =>
  api.get(`/refugios?search=${encodeURIComponent(search)}`).catch(handleError);

export const createRefugio = (refugioData) =>
  api.post('/refugios', refugioData).catch(handleError);

export const updateRefugio = (id, refugioData) =>
  api.put(`/refugios/${id}`, refugioData).catch(handleError);

export const deleteRefugio = (id) =>
  api.delete(`/refugios/${id}`).catch(handleError);

export const fetchMisRefugios = () =>
  api.get('/refugios/yo').catch(handleError);

export const getAllMascotas = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  try {
    const response = await api.get(`/mascotas?${params.toString()}`);
    return response.data; // ✅ solo los datos
  } catch (error) {
    console.error("Error fetching mascotas:", error);
    return []; // ✅ devuelve array vacío en lugar de objeto con error
  }
};

export const getMascotaById = async (id) => {
  try {
    const response = await api.get(`/mascotas/${id}`);
    return response.data; // ✅ devuelve solo los datos
  } catch (error) {
    console.error('Error obteniendo mascota:', error);
    return null;
  }
};
export const createMascota = (mascotaData) =>
  api.post('/mascotas', mascotaData).catch(handleError);

export const updateMascota = (id, mascotaData) =>
  api.put(`/mascotas/${id}`, mascotaData).catch(handleError);

export const deleteMascota = (id) =>
  api.delete(`/mascotas/${id}`).catch(handleError);

export const getMascotasByRefugio = (refugioId) =>
  api.get(`/mascotas?refugio=${refugioId}`).catch(handleError);

export default api;