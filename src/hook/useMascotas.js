import { useState, useEffect } from "react";
import { getAllMascotas } from "../services/apiService";

const ITEMS_POR_PAGE = 12;

export const useMascotas = (searchValue = "") => {
  const [mascotas, setMascotas] = useState([]);
  const [allMascotas, setAllMascotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const getMascotas = async () => {
      try {
        const data = await getAllMascotas(searchValue);
        setAllMascotas(data);
      } catch (error) {
        console.error("Error fetching mascotas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMascotas();
  }, [searchValue]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_POR_PAGE;
    const endIndex = startIndex + ITEMS_POR_PAGE;
    setMascotas(allMascotas.slice(startIndex, endIndex));
  }, [allMascotas, currentPage]);

  const totalPages = Math.ceil(allMascotas.length / ITEMS_POR_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { mascotas, allMascotas, isLoading, totalPages, currentPage, handlePageChange };
};