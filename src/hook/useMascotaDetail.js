// useMascotaDetail.js
import { useState, useEffect } from 'react';
import { getMascotaById, fetchRefugioById } from '../services/apiService';

export const useMascotaDetail = (id) => {
  const [mascota, setMascota] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMascotaDetail = async () => {
      if (!id) {
        setIsLoading(false);
        setError('ID de mascota no válido.');
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMascotaById(id);
        if (!data) {
          setError('No se pudo cargar la mascota.');
          return;
        }

        const refugioRes = await fetchRefugioById(data.refugio);
        const refugio = refugioRes.data;

        const mapped = {
          nombre: data.nombre ?? 'Sin nombre',
          edad: data.edad ?? null,
          genero: data.genero ?? null,
          tamano: data.tamano ?? null,
          descripcion: data.descripcion ?? null,
          caracteristicas: data.caracteristicas ?? [],
          estado: data.estado ?? 'disponible',
          imagen: data.imagen ?? [],
          refugio,
          raza: data.raza ?? null,
        };

        setMascota(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMascotaDetail();
  }, [id]);

  return { mascota, isLoading, error };
};