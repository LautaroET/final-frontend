// Importamos la librería axios
import axios from "axios";

// Obtiene la URL base de la API desde la variable de entorno
const BASE_URL = import.meta.env.VITE_API_URL;

/* ======================================================
   REFUGIOS
====================================================== */

// Traer todos los refugios con búsqueda opcional
export const fetchAllRefugios = async (search = "") => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/refugios`);
    return data
      .map((r) => ({
        id: r._id, // <- backend usa _id → frontend usa id
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

// Traer refugio por ID
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

/* ======================================================
   MASCOTAS
====================================================== */

// Traer todas las mascotas
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
      refuge: m.refugio, // puede ser id o un objeto
    }));
  } catch (error) {
    console.error("Error fetching mascotas:", error);
    return [];
  }
};

// Traer mascota por ID
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
