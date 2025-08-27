import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button' 

const Registrarse = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos de registro:', formData)
  }

  return (
    <div className="p-8 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Crear Cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>
        
        <div>
          <label htmlFor="confirmarPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirmarPassword"
            name="confirmarPassword"
            value={formData.confirmarPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>
        
        {/* Usamos el componente Button aquí */}
        <Button type="submit" className="w-full">
          Registrarse
        </Button>
        
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/auth/iniciar" className="text-blue-600 dark:text-indigo-500 hover:text-blue-700 dark:hover:text-indigo-600 transition-colors font-medium">
              Inicia sesión
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Registrarse