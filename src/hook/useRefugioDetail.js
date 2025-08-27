import { useState, useEffect } from 'react';
import { fetchRefugioById } from '../services/apiService';
import { useParams } from 'react-router-dom';

export const useRefugioDetail = () => {
  const { id } = useParams();
  const { refugio, isLoading, error } = useRefugioDetail(id);

  if (!id) return <p>Falta el ID de refugio en la URL.</p>;
  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

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