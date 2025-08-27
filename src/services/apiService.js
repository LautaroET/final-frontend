// src/services/apiService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

/* =========================
   REFUGIOS
========================= */

export const fetchAllRefugios = async (search = "") => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/refugios`);
    return data
      .map((r) => ({
        id: r._id,
        name: r.nombre,
        address: r.direccion,
        phone: r.telefono,
        email: r.email,
        description: r.descripcion,
        adoptionProcess: r.procesoAdopcion,
        openingHours: r.horario,
        image: r.imagen,
      }))
      .filter(
        (r) =>
          !search ||
          r.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.address?.toLowerCase().includes(search.toLowerCase())
      );
  } catch (error) {
    console.error("Error fetching refugios:", error);
    return [];
  }
};

export const fetchRefugioById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/refugios/${id}`);
    return {
      id: data._id,
      name: data.nombre,
      address: data.direccion,
      phone: data.telefono,
      email: data.email,
      description: data.descripcion,
      adoptionProcess: data.procesoAdopcion,
      openingHours: data.horario,
      image: data.imagen,
    };
  } catch (error) {
    console.error("Error fetching refugio by ID:", error);
    return null;
  }
};

export const deleteRefugio = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/refugios/${id}`);
  } catch (error) {
    console.error("Error al eliminar refugio:", error);
    throw error;
  }
};

export const createRefugio = async (refugioData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/refugios`, refugioData);
    return data;
  } catch (error) {
    console.error("Error al crear refugio:", error);
    throw error;
  }
};

export const updateRefugio = async (id, refugioData) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/api/refugios/${id}`, refugioData);
    return data;
  } catch (error) {
    console.error("Error al actualizar refugio:", error);
    throw error;
  }
};

/* =========================
   MASCOTAS
========================= */

export const fetchAllMascotas = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/mascotas`);
    return data.map((m) => ({
      id: m._id,
      name: m.nombre,
      age: m.edad,
      type: m.tipo,
      breed: m.raza,
      size: m.tamaño,
      health: m.salud,
      description: m.descripcion,
      image: m.imagen,
      refuge: m.refugio,
    }));
  } catch (error) {
    console.error("Error fetching mascotas:", error);
    return [];
  }
};

export const fetchMascotaById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/mascotas/${id}`);
    return {
      id: data._id,
      name: data.nombre,
      age: data.edad,
      type: data.tipo,
      breed: data.raza,
      size: data.tamaño,
      health: data.salud,
      description: data.descripcion,
      image: data.imagen,
      refuge: data.refugio,
    };
  } catch (error) {
    console.error("Error fetching mascota by ID:", error);
    return null;
  }
};

export const getMascotasByRefugio = async (refugioId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/refugios/${refugioId}/mascotas`);
    return data.map((m) => ({
      id: m._id,
      name: m.name,
      age: m.age,
      breed: m.breed,
      gender: m.gender,
      size: m.size,
      personality: m.personality,
      status: m.status,
      description: m.description,
      history: m.history,
      image: m.image,
      refugio: m.refugio,
    }));
  } catch (error) {
    console.error("Error obteniendo mascotas por refugio:", error);
    return [];
  }
};

export const createMascota = async (refugioId, mascotaData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/mascotas`, {
      ...mascotaData,
      refugio: refugioId,
    });
    return data;
  } catch (error) {
    console.error("Error al crear mascota:", error);
    throw error;
  }
};

export const updateMascota = async (refugioId, mascotaId, mascotaData) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/api/mascotas/${mascotaId}`, {
      ...mascotaData,
      refugio: refugioId,
    });
    return data;
  } catch (error) {
    console.error("Error al actualizar mascota:", error);
    throw error;
  }
};

export const getAllMascotas = async (searchValue = "") => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/mascotas`);
    return data
      .map((m) => ({
        id: m._id,
        name: m.name,
        age: m.age,
        breed: m.breed,
        gender: m.gender,
        size: m.size,
        personality: m.personality,
        status: m.status,
        description: m.description,
        history: m.history,
        image: m.image,
        refugio: m.refugio,
      }))
      .filter(
        (m) =>
          !searchValue ||
          m.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          m.breed?.toLowerCase().includes(searchValue.toLowerCase())
      );
  } catch (error) {
    console.error("Error al obtener mascotas:", error);
    return [];
  }
};
export const getMascotaById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/mascotas/${id}`);
    return {
      id: data._id,
      name: data.name,
      age: data.age,
      breed: data.breed,
      gender: data.gender,
      size: data.size,
      personality: data.personality,
      status: data.status,
      description: data.description,
      history: data.history,
      image: data.image,
      refugio: data.refugio,
    };
  } catch (error) {
    console.error("Error al obtener mascota por ID:", error);
    return null;
  }
};