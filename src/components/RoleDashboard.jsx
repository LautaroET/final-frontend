// src/components/RoleDashboard.jsx
import React from 'react';

const RoleDashboard = ({ user }) => {
  const rol = user?.role;

  if (!rol) return <p className="text-gray-600 dark:text-gray-300">Rol no definido.</p>;

  switch (rol) {
    case 'comun':
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Tus Mascotas Favoritas</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Aquí podrás ver tus mascotas favoritas pronto.</p>
        </div>
      );

    case 'refugio':
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Gestión de tu Refugio</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Administra las mascotas de tu refugio.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Ver mis mascotas
          </button>
        </div>
      );

    case 'admin':
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Panel de Administrador</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Acceso total a usuarios, mascotas y refugios.</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Ver estadísticas
          </button>
        </div>
      );

    default:
      return <p className="text-gray-600 dark:text-gray-300">Rol no reconocido.</p>;
  }
};

export default RoleDashboard;