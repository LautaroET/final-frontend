// src/hook/useRefugioDetail.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useRefugioDetail = (id) => {
  const [refugio, setRefugio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Falta el ID de refugio en la URL.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/refugios/${id}`
        );
        setRefugio(response.data);
      } catch (err) {
        console.error("Error al cargar el refugio:", err);
        setError("Error al cargar el refugio.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { refugio, isLoading, error };
};

