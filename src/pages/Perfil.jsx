// Cuenta.jsx
import React from 'react'

const Perfil = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Mi Cuenta</h1>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Nombre:</span>
            <span className="font-medium text-gray-800 dark:text-white">Usuario Ejemplo</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Email:</span>
            <span className="font-medium text-gray-800 dark:text-white">usuario@ejemplo.com</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">Teléfono:</span>
            <span className="font-medium text-gray-800 dark:text-white">+1234567890</span>
          </div>
          <button className="w-full mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  )
}

export default Perfil