import { useState, useEffect } from 'react';
import { getMascotaById } from '../services/apiService';

export const useMascotaDetail = (id) => {
  const [mascota, setMascota] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMascotaDetail = async () => {
      if (!id) {
        setIsLoading(false);
        setError("ID de mascota no válido.");
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMascotaById(id);
        setMascota(data);
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