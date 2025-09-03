import { useState, useEffect } from 'react';
import { fetchRefugioById } from '../services/apiService';

export const useRefugioDetail = (id) => {
  const [refugio, setRefugio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRefugioDetail = async () => {
      if (!id) {
        setIsLoading(false);
        setError("ID de refugio no válido.");
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchRefugioById(id);
        setRefugio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getRefugioDetail();
  }, [id]);

  return { refugio, isLoading, error };
};