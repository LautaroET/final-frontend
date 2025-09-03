// useMascotas.js
import { useState, useEffect } from "react";
import { getAllMascotas } from "../services/apiService";

const ITEMS_POR_PAGE = 12;

export const useMascotas = (searchValue = "") => {
  const [mascotas, setMascotas] = useState([]);
  const [allMascotas, setAllMascotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Carga todas las mascotas una sola vez
  useEffect(() => {
    setIsLoading(true);
    const getMascotas = async () => {
      try {
        const data = await getAllMascotas(); // sin filtros
        setAllMascotas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching mascotas:", error);
        setAllMascotas([]);
      } finally {
        setIsLoading(false);
      }
    };
    getMascotas();
  }, []);

  // Filtra y pagina en el cliente
  useEffect(() => {
    const filtered = allMascotas.filter((m) =>
      m.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_POR_PAGE;
    const endIndex = startIndex + ITEMS_POR_PAGE;
    setMascotas(filtered.slice(startIndex, endIndex));
  }, [allMascotas, currentPage, searchValue]);

  const totalPages = Math.ceil(
    allMascotas.filter((m) =>
      m.nombre.toLowerCase().includes(searchValue.toLowerCase())
    ).length / ITEMS_POR_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    mascotas,
    allMascotas,
    isLoading,
    totalPages,
    currentPage,
    handlePageChange,
  };
};