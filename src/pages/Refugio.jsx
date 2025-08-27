import React, { useState } from 'react';
import RefugioList from "../components/RefugioList";
import Loader from "../components/Loader";
import SearchInput from "../components/SearchInput";
import Button from "../components/Button";
import { useRefugios } from "../hook/useRefugios";
import { useNavigate } from 'react-router-dom';
import Pagination from "../components/Pagination";

const Refugios = () => {
  const [searchValue, setSearchValue] = useState("");
  const { refugios, allRefugios, isLoading, totalPages, currentPage, handlePageChange } = useRefugios(searchValue);
  const navigate = useNavigate();

  const handleAddRefugio = () => {
    navigate('/refugios/nuevo');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700 rounded-lg shadow-md">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Sección de cabecera con el título y el botón */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-blue-400 text-center sm:text-left tracking-tight">
            Encuentra tu Próximo Compañero
          </h1>
          <Button onClick={handleAddRefugio}>
            <i className="bi bi-plus-circle-fill mr-2"></i>Agregar Nuevo
          </Button>
        </div>

        {/* Sección del buscador, centrada y con un ancho máximo */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-xl">
            <SearchInput onSearchChange={setSearchValue} />
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <RefugioList 
              refugios={refugios} 
              allRefugios={allRefugios} 
            />
            {/* Agrega el componente de paginación aquí */}
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Refugios;