import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { FavoritosContext } from "../context/FavoritosContext";

function RefugioCard({ refugio }) {
  const { favoritos = { refugios: [], mascotas: [] }, agregarAFavoritos, eliminarDeFavoritos } = useContext(FavoritosContext);
  
  // Asegurarse de que favoritos.refugios sea un array
  const favoritosRefugios = Array.isArray(favoritos.refugios) ? favoritos.refugios : [];
  
  const isFavorite = favoritosRefugios.some((fav) => fav.id === refugio.id);

  const handleClick = (e) => {
    e.preventDefault(); 
    isFavorite 
      ? eliminarDeFavoritos(refugio.id, 'refugios')
      : agregarAFavoritos(refugio, 'refugios');
  };

  const ariaLabel = isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos";

  return (
    <Link to={`/refugios/${refugio.id}`}>
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 dark:shadow-2xl dark:hover:shadow-lg flex flex-col">
        {/* Botón de corazón */}
        <button
          onClick={handleClick}
          className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors duration-300
                      ${isFavorite 
                        ? "text-red-500 bg-white/70 dark:bg-gray-700/70" 
                        : "text-gray-400 bg-white/70 dark:bg-gray-700/70 hover:text-red-500"
                      }`}
          aria-label={ariaLabel}
        >
          <i className={`bi bi-heart${isFavorite ? "-fill" : ""} text-2xl`}></i>
        </button>

        {/* Contenido de la tarjeta */}
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={refugio.image}
            alt={`Imagen de ${refugio.name}`}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="p-6 flex flex-col flex-grow text-left">
          <h3 className="text-2xl font-bold text-indigo-700 dark:text-blue-400 mb-4 text-center">
            {refugio.name}
          </h3>
          
          <div className="flex-grow space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              <i className="bi bi-geo-alt-fill text-indigo-500 mr-2"></i>
              {refugio.address}
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              <i className="bi bi-telephone-fill text-indigo-500 mr-2"></i>
              {refugio.phone}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RefugioCard;








