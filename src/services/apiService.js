import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

/* ============================
   REFUGIOS
   ============================ */

export const fetchAllRefugios = async (search = '') => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/refugios`);
    return data.filter(r =>
      !search ||
      r.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      r.direccion?.toLowerCase().includes(search.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching refugios:', error);
    return [];
  }
};

export const fetchRefugioById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/api/refugios/${id}`);
  return data;
};

export const createRefugio = async (payload) =>
  (await axios.post(`${BASE_URL}/api/refugios`, payload)).data;

export const updateRefugio = async (id, payload) =>
  (await axios.put(`${BASE_URL}/api/refugios/${id}`, payload)).data;

export const deleteRefugio = async (id) =>
  axios.delete(`${BASE_URL}/api/refugios/${id}`);

/* ============================
   MASCOTAS
   ============================ */

export const getAllMascotas = async (search = '') => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/mascotas`);
    return data.filter(m =>
      !search ||
      m.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      m.descripcion?.toLowerCase().includes(search.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching mascotas:', error);
    return [];
  }
};

export const getMascotaById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/api/mascotas/${id}`);
  return data;
};

export const createMascota = async (payload) =>
  (await axios.post(`${BASE_URL}/api/mascotas`, payload)).data;

export const updateMascota = async (id, payload) =>
  (await axios.put(`${BASE_URL}/api/mascotas/${id}`, payload)).data;

export const deleteMascota = async (id) =>
  axios.delete(`${BASE_URL}/api/mascotas/${id}`);

export const getMascotasByRefugio = async (refugioId) => {
  const { data } = await axios.get(`${BASE_URL}/api/refugios/${refugioId}/mascotas`);
  return data;
};