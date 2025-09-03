// IniciarSesion.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from './Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MySwal = withReactContent(Swal);

const schema = yup.object().shape({
  email: yup.string().email('Ingresa un correo válido').required('El correo es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

const IniciarSesion = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    console.log('Login:', data);
    toast.success('¡Inicio de sesión exitoso!', { position: 'bottom-right' });
    MySwal.fire({
      title: '¡Bienvenido de nuevo!',
      text: 'Has iniciado sesión correctamente.',
      icon: 'success',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#2563eb',
    }).then(() => onClose());
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-amber-50 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900 p-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset className="border border-gray-300 dark:border-gray-600 rounded-xl p-5">
            <legend className="px-2 text-lg font-semibold text-blue-700 dark:text-blue-400">
              Credenciales
            </legend>

            <div className="space-y-4 mt-2">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password con toggle */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contraseña
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full pr-12 px-4 py-2.5 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <i className="bi bi-eye text-lg" />
                  ) : (
                    <i className="bi bi-eye-slash text-lg" />
                  )}
                </button>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>
            </div>
          </fieldset>

          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;