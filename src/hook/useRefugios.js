import { useState, useEffect } from "react";
import { fetchAllRefugios } from "../services/apiService";

const ITEMS_POR_PAGE = 12; // Define la cantidad de ítems por página

export const useRefugios = (searchValue = "") => {
  const [refugios, setRefugios] = useState([]);
  const [allRefugios, setAllRefugios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Nuevo estado para la página actual

  useEffect(() => {
    setIsLoading(true);
    const getRefugios = async () => {
      try {
        const data = await fetchAllRefugios(searchValue);
        setAllRefugios(data);
      } catch (error) {
        console.error("Error fetching refugios:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRefugios();
  }, [searchValue]);

  // Nuevo useEffect para actualizar los refugios visibles cuando cambia la página o la búsqueda
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_POR_PAGE;
    const endIndex = startIndex + ITEMS_POR_PAGE;
    setRefugios(allRefugios.slice(startIndex, endIndex));
  }, [allRefugios, currentPage]);

  const totalPages = Math.ceil(allRefugios.length / ITEMS_POR_PAGE);

  // Nueva función para cambiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { refugios, allRefugios, isLoading, totalPages, currentPage, handlePageChange };
};
