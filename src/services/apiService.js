import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// --- Operaciones para Refugios ---

export const fetchAllRefugios = async (search = "") => {
  try {
    const [byName, byAddress] = await Promise.allSettled([
      axios.get(`${BASE_URL}/refugios`, { params: { name: search } }),
      axios.get(`${BASE_URL}/refugios`, { params: { address: search } }),
    ]);

    const dataByName = byName.status === "fulfilled" ? byName.value.data : [];
    const dataByAddress = byAddress.status === "fulfilled" ? byAddress.value.data : [];

    const allRefugios = [...dataByName, ...dataByAddress];
    const uniqueRefugios = allRefugios.filter(
      (refugio, index, self) => self.findIndex(r => r.id === refugio.id) === index
    );

    return uniqueRefugios;

  } catch (error) {
    console.error("Error fetching refugios:", error);
    return [];
  }
};

export const fetchRefugioById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/refugios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching refugio with id ${id}:`, error);
    throw new Error("No se pudo cargar la información del refugio.");
  }
};

export const createRefugio = async (refugioData) => {
  try {
    const response = await axios.post(`${BASE_URL}/refugios`, refugioData);
    return response.data;
  } catch (error) {
    console.error("Error creating refugio:", error);
    throw error;
  }
};

export const updateRefugio = async (id, refugioData) => {
  try {
    const response = await axios.put(`${BASE_URL}/refugios/${id}`, refugioData);
    return response.data;
  } catch (error) {
    console.error(`Error updating refugio ${id}:`, error);
    throw error;
  }
};

export const deleteRefugio = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/refugios/${id}`);
  } catch (error) {
    console.error(`Error deleting refugio ${id}:`, error);
    throw error;
  }
};

// --- Operaciones para Mascotas ---

export const getAllMascotas = async (search = "") => {
  try {
    const refugios = await fetchAllRefugios();
    
    const mascotasPromises = refugios.map(async (refugio) => {
      try {
        const response = await axios.get(`${BASE_URL}/refugios/${refugio.id}/pets`, {
          params: { q: search } // Usar 'q' para búsqueda full-text en JSON Server
        });
        
        return response.data.map(mascota => ({
          ...mascota,
          refugio: {
            id: refugio.id,
            name: refugio.name,
            address: refugio.address,
            phone: refugio.phone
          }
        }));
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error(`Error obteniendo mascotas del refugio ${refugio.id}:`, error);
        }
        return [];
      }
    });

    const allMascotas = (await Promise.all(mascotasPromises)).flat();
    return allMascotas;

  } catch (error) {
    console.error("Error inesperado:", error);
    return [];
  }
};

export const getMascotaById = async (idMascota) => {
  try {
    const refugios = await fetchAllRefugios();
    
    for (const refugio of refugios) {
      try {
        const response = await axios.get(`${BASE_URL}/refugios/${refugio.id}/pets/${idMascota}`);
        if (response.data) {
          return {
            ...response.data,
            refugio: {
              id: refugio.id,
              name: refugio.name,
              address: refugio.address,
              phone: refugio.phone
            }
          };
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error(`Error en refugio ${refugio.id}:`, error);
        }
      }
    }
    
    throw new Error(`Mascota con ID ${idMascota} no encontrada.`);
  } catch (error) {
    console.error(`Error buscando mascota ${idMascota}:`, error);
    throw error;
  }
};

export const createMascota = async (refugioId, mascotaData) => {
  try {
    const response = await axios.post(`${BASE_URL}/refugios/${refugioId}/pets`, mascotaData);
    return response.data;
  } catch (error) {
    console.error(`Error creando mascota en refugio ${refugioId}:`, error);
    throw error;
  }
};

export const updateMascota = async (refugioId, mascotaId, mascotaData) => {
  try {
    const response = await axios.put(`${BASE_URL}/refugios/${refugioId}/pets/${mascotaId}`, mascotaData);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando mascota ${mascotaId}:`, error);
    throw error;
  }
};

export const deleteMascota = async (refugioId, mascotaId) => {
  try {
    await axios.delete(`${BASE_URL}/refugios/${refugioId}/pets/${mascotaId}`);
  } catch (error) {
    console.error(`Error eliminando mascota ${mascotaId}:`, error);
    throw error;
  }
};

export const getMascotasByRefugio = async (refugioId) => {
  try {
    const response = await axios.get(`${BASE_URL}/refugios/${refugioId}/pets`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo mascotas del refugio ${refugioId}:`, error);
    if (error.response?.status === 404) {
      return []; // Retornar array vacío si no hay mascotas
    }
    throw error;
  }
};