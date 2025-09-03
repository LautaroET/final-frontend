// Registrarse.jsx (adaptado para modal/bottom-sheet)
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from './Button';

const schema = yup.object().shape({
  username: yup.string().required('Requerido').min(4, 'Mínimo 4 caracteres'),
  nombre: yup.string().required('Requerido'),
  email: yup.string().email('Correo inválido').required('Requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
  confirmarPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'No coincide')
    .required('Requerido'),
});

const Registrarse = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Registro:', data);
    alert(`¡Registro exitoso! Bienvenido, ${data.username}.`);
    onClose();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Encabezado */}
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Crear Cuenta
      </h2>

      {/* Contenedor scrollable */}
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
          {/* Información de la cuenta */}
          <fieldset className="border border-gray-300 dark:border-gray-600 rounded-xl p-4">
            <legend className="px-2 text-lg font-semibold text-blue-700 dark:text-blue-400">
              Información de la Cuenta
            </legend>
            <div className="space-y-4 mt-2">
              <input {...register('username')} placeholder="Usuario" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" />
              {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}

              <input {...register('nombre')} placeholder="Nombre completo" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" />
              {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}

              <input {...register('email')} type="email" placeholder="Correo electrónico" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </fieldset>

          {/* Seguridad */}
          <fieldset className="border border-gray-300 dark:border-gray-600 rounded-xl p-4">
            <legend className="px-2 text-lg font-semibold text-blue-700 dark:text-blue-400">
              Seguridad
            </legend>
            <div className="space-y-4 mt-2">
              <div className="relative">
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Contraseña" className="w-full pr-12 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600">
                  <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} text-lg`} />
                </button>
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <div className="relative">
                <input {...register('confirmarPassword')} type={showPassword ? 'text' : 'password'} placeholder="Confirmar contraseña" className="w-full pr-12 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600">
                  <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} text-lg`} />
                </button>
                {errors.confirmarPassword && <p className="text-sm text-red-500">{errors.confirmarPassword.message}</p>}
              </div>
            </div>
          </fieldset>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button type="submit" className="flex-1">
              Registrarse
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;