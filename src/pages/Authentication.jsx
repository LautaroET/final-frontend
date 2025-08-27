import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Button from '../components/Button' 

const Authentication = () => {
  return (
    <div className="text-center p-8 max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        ¡Bienvenido a <span className="text-blue-600 dark:text-indigo-500">Patitas al Rescate</span>!
      </h2>
      <div className="space-y-6 flex justify-between">
        {/* Usamos el componente Button para el botón de Iniciar Sesión */}
        <Link to="iniciar" className="block w-full">
          <Button>
            Iniciar Sesión
          </Button>
        </Link>
        {/* Usamos el componente Button para el botón de Registrarse */}
        <Link to="registrarse" className="block w-full">
          <Button>
            Registrarse
          </Button>
        </Link>
      </div>

      {/* Aquí se renderizarán los componentes hijos (IniciarSesion o Registrarse) */}
      <div className="mt-8">
        <Outlet /> 
      </div>
    </div>
  )
}

export default Authentication