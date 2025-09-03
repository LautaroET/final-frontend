import React, { useState } from 'react';
import RefugioList from "../components/RefugioList";
import Loader from "../components/Loader";
import SearchInput from "../components/SearchInput";
import { useRefugios } from "../hook/useRefugios";
import Pagination from "../components/Pagination";

const Refugios = () => {
  const [searchValue, setSearchValue] = useState("");
  const { refugios, allRefugios, isLoading, totalPages, currentPage, handlePageChange } = useRefugios(searchValue);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 transition-colors duration-700 rounded-lg shadow-md">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Sección de cabecera con el título */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-blue-400 text-center sm:text-left tracking-tight">
            Encuentra tu Próximo Compañero
          </h1>
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